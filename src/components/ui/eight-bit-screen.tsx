'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';

interface Pixel {
  x: number;
  y: number;
  key: string;
  color: string;
  index: number;
  gridX: number;
  gridY: number;
}

interface EightBitScreenProps {
  rows?: number;
  cols?: number;
  pixelSize?: number;
  showFire?: boolean;
  fireColors?: string[];
  backgroundColor?: string;
  pixelColor?: string;
  enableHover?: boolean;
  enableScatter?: boolean;
  showBorder?: boolean;
  borderColor?: string;
  className?: string;
  showPowerLed?: boolean;
  showScanlines?: boolean;
  showGlitchEffect?: boolean;
}

// Fire color palette - from hottest to coolest
const DEFAULT_FIRE_COLORS = [
  '#ffffff', // white (hottest)
  '#ffff00', // yellow
  '#ffa500', // orange
  '#ff6600', // dark orange
  '#ff0000', // red
  '#800000', // dark red
  '#400000', // very dark red
  '#000000', // black (coolest/no fire)
];

const generatePixels = (rows: number, cols: number, defaultColor: string): Pixel[] => {
  const pixels: Pixel[] = [];
  
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const index = y * cols + x;
      pixels.push({
        x: x,
        y: y,
        key: `${x}-${y}`,
        color: defaultColor,
        index,
        gridX: x,
        gridY: y
      });
    }
  }
  return pixels;
};

const EightBitScreen: React.FC<EightBitScreenProps> = ({
  rows = 12,
  cols = 20,
  pixelSize = 20,
  showFire = true,
  fireColors = DEFAULT_FIRE_COLORS,
  backgroundColor = '#000',
  pixelColor = '#000000',
  enableHover = true,
  enableScatter = true,
  showBorder = true,
  borderColor = 'rgba(255, 255, 255, 0.05)',
  className = '',
  showPowerLed = false,
  showScanlines = true,
  showGlitchEffect = true,
}) => {
  const MOUSE_RADIUS = pixelSize * 6; // Make radius relative to pixel size
  const FORCE_MULTIPLIER = 0.8; // Increase force for better visibility
  const SCATTER_RADIUS = 300;
  
  const [pixels] = useState<Pixel[]>(() => generatePixels(rows, cols, pixelColor));
  const [isScattered, setIsScattered] = useState(false);
  const [blurAmount, setBlurAmount] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const pixelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scatterTimeoutRef = useRef<number | undefined>(null);
  const fireAnimationRef = useRef<number>(null);
  const fireBufferRef = useRef<number[][]>([]);
  const rafRef = useRef<number>(null);

  // Initialize fire buffer
  useEffect(() => {
    if (!showFire) return;
    
    const buffer: number[][] = [];
    for (let y = 0; y < rows; y++) {
      buffer[y] = [];
      for (let x = 0; x < cols; x++) {
        buffer[y][x] = 0;
      }
    }
    fireBufferRef.current = buffer;
  }, [rows, cols, showFire]);

  // Fire animation
  useEffect(() => {
    if (!showFire) return;
    
    let frameCount = 0;
    
    const animateFire = () => {
      frameCount++;
      
      // Only update fire every 3 frames to reduce CPU usage
      if (frameCount % 3 === 0) {
        const buffer = fireBufferRef.current;
        const newBuffer: number[][] = [];
        
        // Initialize new buffer with zeros
        for (let y = 0; y < rows; y++) {
          newBuffer[y] = new Array(cols).fill(0);
        }

        // Define flame shape - classic 8-bit fire sprite
        const centerX = Math.floor(cols / 2);
        const flameHeight = Math.min(8, Math.floor(rows * 0.67));
        const animOffset = Math.sin(frameCount * 0.1) * 0.5; // Slight animation
        
        // Define flame shape for each row (from bottom up)
        const flameShape = [
          { width: 5, intensity: 7 },  // Row 0 (bottom)
          { width: 7, intensity: 7 },  // Row 1
          { width: 7, intensity: 6 },  // Row 2
          { width: 5, intensity: 6 },  // Row 3
          { width: 5, intensity: 5 },  // Row 4
          { width: 3, intensity: 5 },  // Row 5
          { width: 3, intensity: 4 },  // Row 6
          { width: 1, intensity: 3 },  // Row 7 (top)
        ];

        // Draw the flame
        for (let i = 0; i < flameHeight && i < flameShape.length; i++) {
          const y = rows - 1 - i;
          if (y >= 0) {
            const shape = flameShape[i];
            const width = shape.width;
            const startX = Math.floor(centerX - width / 2 + animOffset);
            
            for (let j = 0; j < width; j++) {
              const x = startX + j;
              if (x >= 0 && x < cols) {
                // Add core/edge variation
                const isCore = j > 0 && j < width - 1 && i < flameHeight - 2;
                const intensity = isCore ? shape.intensity : Math.max(0, shape.intensity - 2);
                
                // Add slight randomness for flickering
                const flicker = Math.random() > 0.8 ? -1 : 0;
                newBuffer[y][x] = Math.max(0, Math.min(7, intensity + flicker));
              }
            }
          }
        }

        // Add some random sparks above the flame
        if (Math.random() > 0.7 && flameHeight < rows - 1) {
          const sparkY = rows - flameHeight - 2;
          const sparkX = Math.floor(centerX + (Math.random() - 0.5) * 4);
          if (sparkY >= 0 && sparkX >= 0 && sparkX < cols) {
            newBuffer[sparkY][sparkX] = 2;
          }
        }

        fireBufferRef.current = newBuffer;

        // Update pixel colors
        if (!isScattered) {
          pixels.forEach((pixel, index) => {
            const pixelElement = pixelRefs.current[index];
            if (pixelElement) {
              const fireLevel = newBuffer[pixel.gridY][pixel.gridX];
              const color = fireLevel > 0 ? fireColors[7 - fireLevel] : pixelColor;
              pixelElement.style.backgroundColor = color;
              
              // Add subtle glow effect for fire pixels
              if (fireLevel > 3) {
                pixelElement.style.boxShadow = `0 0 ${3 + fireLevel}px ${color}`;
              } else if (fireLevel > 0) {
                pixelElement.style.boxShadow = `0 0 3px ${color}`;
              } else {
                pixelElement.style.boxShadow = 'none';
              }
            }
          });
        }
      }

      fireAnimationRef.current = requestAnimationFrame(animateFire);
    };

    fireAnimationRef.current = requestAnimationFrame(animateFire);

    return () => {
      if (fireAnimationRef.current) {
        cancelAnimationFrame(fireAnimationRef.current);
      }
    };
  }, [pixels, rows, cols, isScattered, showFire, fireColors, pixelColor]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current || isScattered || !enableHover) return;
    
    // Cancel previous animation frame
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }
    
    rafRef.current = requestAnimationFrame(() => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Direct DOM manipulation for better performance
      pixels.forEach((pixel, index) => {
        const pixelElement = pixelRefs.current[index];
        if (!pixelElement) return;

        // Calculate pixel center position
        const pixelCenterX = (pixel.x * pixelSize) + pixelSize / 2;
        const pixelCenterY = (pixel.y * pixelSize) + pixelSize / 2;
        
        const dx = x - pixelCenterX;
        const dy = y - pixelCenterY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < MOUSE_RADIUS && distance > 0) {
          const force = Math.pow(1 - distance / MOUSE_RADIUS, 2) * FORCE_MULTIPLIER;
          const offsetX = -(dx / distance) * force * 40;
          const offsetY = -(dy / distance) * force * 40;
          const scale = 1 + force * 0.4;
          
          pixelElement.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(${scale})`;
        } else {
          pixelElement.style.transform = 'translate(0, 0) scale(1)';
        }
      });
    });
  }, [pixels, isScattered, enableHover, pixelSize, MOUSE_RADIUS, FORCE_MULTIPLIER]);

  const handleMouseLeave = useCallback(() => {
    if (isScattered || !enableHover) return;
    
    // Cancel any pending animation frame
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }
    
    // Reset all pixels
    pixelRefs.current.forEach(pixelElement => {
      if (pixelElement) {
        pixelElement.style.transform = 'translate(0, 0) scale(1)';
      }
    });
  }, [isScattered, enableHover]);

  const handleClick = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current || isScattered || !enableScatter) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    setIsScattered(true);
    setBlurAmount(8);

    // Scatter pixels
    pixels.forEach((pixel, index) => {
      const pixelElement = pixelRefs.current[index];
      if (!pixelElement) return;

      // Calculate random scatter direction from click point
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * SCATTER_RADIUS + 100;
      const scatterX = Math.cos(angle) * distance;
      const scatterY = Math.sin(angle) * distance;
      const rotation = (Math.random() - 0.5) * 720;
      const scale = 0.3 + Math.random() * 0.7;

      pixelElement.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94), filter 0.6s ease-out';
      pixelElement.style.transform = `translate(${scatterX}px, ${scatterY}px) rotate(${rotation}deg) scale(${scale})`;
    });

    // Clear any existing timeout
    if (scatterTimeoutRef.current) {
      clearTimeout(scatterTimeoutRef.current);
    }

    // Return pixels after delay
    scatterTimeoutRef.current = window.setTimeout(() => {
      setBlurAmount(0);
      
      pixelRefs.current.forEach(pixelElement => {
        if (pixelElement) {
          pixelElement.style.transition = 'transform 1.2s cubic-bezier(0.34, 1.56, 0.64, 1), filter 0.8s ease-in-out';
          pixelElement.style.transform = 'translate(0, 0) rotate(0deg) scale(1)';
        }
      });

      setTimeout(() => {
        setIsScattered(false);
        // Reset transition for hover effects
        pixelRefs.current.forEach(pixelElement => {
          if (pixelElement) {
            pixelElement.style.transition = 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), background-color 0.1s ease';
          }
        });
      }, 1200);
    }, 600);
  }, [pixels, isScattered, enableScatter]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (scatterTimeoutRef.current) {
        clearTimeout(scatterTimeoutRef.current);
      }
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return (
    <div className={className} style={{ 
      position: 'relative', 
      display: 'inline-block',
      padding: pixelSize, // Add padding to prevent clipping on hover
      // background:"transparent"
    }}>
      <div 
        className="bg-[#fefefe] dark:bg-[#151515]"
        ref={containerRef}
        style={{
          position: 'relative',
          width: cols * pixelSize,
          height: rows * pixelSize,
          // background: "#ffffff10",
          borderRadius: '5px',
          overflow: 'hidden',
          cursor: enableScatter ? 'pointer' : (enableHover ? 'crosshair' : 'default'),
          filter: `blur(${blurAmount}px)`,
          transition: 'filter 0.6s ease-in-out',
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        onMouseEnter={(e) => {
          // Force a position update on mouse enter
          if (enableHover) {
            handleMouseMove(e);
          }
        }}
      >
        {/* Scanlines overlay */}
        {showScanlines && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              rgba(0, 255, 255, 0.03) 2px,
              rgba(0, 255, 255, 0.03) 4px
            )`,
            pointerEvents: 'none' as const,
            zIndex: 1,
            opacity: 0.5,
          }} />
        )}
        
        {/* Pixels */}
        {pixels.map((pixel, index) => (
          <div
            key={pixel.key}
            ref={(el) => { pixelRefs.current[index] = el; }}
            style={{
              position: 'absolute',
              left: pixel.x * pixelSize,
              top: pixel.y * pixelSize,
              width: pixelSize - 4,
              height: pixelSize - 4,
              backgroundColor: pixel.color,
              borderRadius: '2px',
              filter: 'brightness(1.2)',
              border: showBorder ? `1px solid ${borderColor}` : 'none',
              willChange: 'transform',
              transform: 'translate(0, 0) scale(1)',
              transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), background-color 0.1s ease',
            }}
          />
        ))}
        
        {/* Glitch effect overlay */}
        {showGlitchEffect && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `repeating-linear-gradient(
              90deg,
              transparent,
              transparent 5px,
              rgba(255, 0, 255, 0.02) 5px,
              rgba(255, 0, 255, 0.02) 10px
            )`,
            pointerEvents: 'none' as const,
            zIndex: 2,
            mixBlendMode: 'screen' as const,
            opacity: 0.3,
          }} />
        )}
      </div>
      
      {/* Power LED */}
      {showPowerLed && (
        <motion.div 
          style={{
            position: 'absolute',
            bottom: '10px',
            left: '20px',
            width: '8px',
            height: '8px',
            background: '#00ff00',
            borderRadius: '50%',
            boxShadow: '0 0 10px #00ff00',
          }}
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      )}
    </div>
  );
};

export default EightBitScreen; 