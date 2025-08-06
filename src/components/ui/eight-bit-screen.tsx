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

type AnimationType = 'fire' | 'hourglass' | 'none';

interface EightBitScreenProps {
  rows?: number;
  cols?: number;
  pixelSize?: number;
  animationType?: AnimationType;
  fireColors?: string[];
  hourglassColors?: string[];
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

// Hourglass color palette - green theme to match reference
const DEFAULT_HOURGLASS_COLORS = [
  '#5487b0', // white (hottest)
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
  animationType = 'hourglass',
  fireColors = DEFAULT_FIRE_COLORS,
  hourglassColors = DEFAULT_HOURGLASS_COLORS,
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
  const animationRef = useRef<number>(null);
  const animationBufferRef = useRef<number[][]>([]);
  const rafRef = useRef<number>(null);

  // Initialize animation buffer
  useEffect(() => {
    if (animationType === 'none') return;
    
    const buffer: number[][] = [];
    for (let y = 0; y < rows; y++) {
      buffer[y] = [];
      for (let x = 0; x < cols; x++) {
        buffer[y][x] = 0;
      }
    }
    animationBufferRef.current = buffer;
  }, [rows, cols, animationType]);

  const generateHourglassFrame = useCallback((frameCount: number) => {
    const buffer = animationBufferRef.current;
    const newBuffer: number[][] = [];
    
    // Initialize new buffer with zeros
    for (let y = 0; y < rows; y++) {
      newBuffer[y] = new Array(cols).fill(0);
    }

    const centerX = Math.floor(cols / 2);
    const totalFrames = 240; // Total animation cycle
    const middleY = Math.floor(rows / 2);

    // Define precise hourglass shape - more geometric like the reference
    const hourglassWalls: number[][] = [];
    for (let y = 0; y < rows; y++) {
      hourglassWalls[y] = new Array(cols).fill(0);
    }

    // Create a more precise hourglass shape
    const hourglassWidth = Math.min(cols - 6, rows - 6); // Make it fit nicely
    const halfWidth = Math.floor(hourglassWidth / 2);
    
    for (let y = 0; y < rows; y++) {
      // Calculate the width at this row for the hourglass shape
      let wallWidth;
      
      if (y <= 1 || y >= rows - 2) {
        // Top and bottom - full width
        wallWidth = halfWidth;
      } else if (y === middleY || y === middleY - 1) {
        // Middle - narrowest point (1 pixel wide opening)
        wallWidth = 1;
      } else {
        // Calculate slope - more dramatic narrowing
        const distFromEdge = Math.min(y - 1, rows - 2 - y);
        const distFromMiddle = Math.abs(y - middleY);
        
        // Create a more linear taper
        const maxDist = Math.floor(rows / 2) - 1;
        const ratio = distFromMiddle / maxDist;
        wallWidth = Math.max(1, Math.floor(1 + (halfWidth - 1) * ratio));
      }
      
      // Draw the walls at calculated positions
      const leftWall = centerX - wallWidth;
      const rightWall = centerX + wallWidth;
      
      // Top and bottom solid walls
      if (y === 0 || y === rows - 1) {
        for (let x = leftWall; x <= rightWall; x++) {
          if (x >= 0 && x < cols) {
            hourglassWalls[y][x] = 1;
          }
        }
      } else {
        // Side walls only
        if (leftWall >= 0 && leftWall < cols) hourglassWalls[y][leftWall] = 1;
        if (rightWall >= 0 && rightWall < cols && rightWall !== leftWall) hourglassWalls[y][rightWall] = 1;
      }
    }

    // Handle sand animation
    const cyclePosition = frameCount % totalFrames;
    const fallProgress = Math.min(1, cyclePosition / (totalFrames * 0.8)); // 80% of cycle for falling
    
    if (fallProgress < 1) {
      // Sand is falling
      const totalSandRows = Math.floor((rows - 4) / 2); // Available rows for sand in each chamber
      const fallenRows = Math.floor(fallProgress * totalSandRows);
      
             // Draw sand in top chamber (decreasing)
       const topChamberStart = 1;
       const topChamberEnd = middleY - 1;
       const remainingSandInTop = totalSandRows - fallenRows;
       
       for (let y = topChamberEnd - remainingSandInTop + 1; y <= topChamberEnd; y++) {
         if (y >= topChamberStart && y < rows) {
           // Calculate internal width (excluding walls)
           const distFromMiddle = Math.abs(y - middleY);
           const maxDist = Math.floor(rows / 2) - 1;
           const ratio = distFromMiddle / maxDist;
           const wallWidth = Math.max(1, Math.floor(1 + (halfWidth - 1) * ratio));
           
           const leftEdge = centerX - wallWidth + 1;
           const rightEdge = centerX + wallWidth - 1;
           
           for (let x = leftEdge; x <= rightEdge; x++) {
             if (x >= 0 && x < cols && hourglassWalls[y][x] === 0) {
               // Calculate sand intensity based on multiple factors
               const depthFromTop = y - (topChamberEnd - remainingSandInTop + 1);
               const maxDepth = remainingSandInTop - 1;
               const depthRatio = maxDepth > 0 ? depthFromTop / maxDepth : 0;
               
               // Distance from center (for radial gradient effect)
               const distFromCenterX = Math.abs(x - centerX);
               const maxDistFromCenter = rightEdge - leftEdge > 0 ? (rightEdge - leftEdge) / 2 : 1;
               const centerRatio = distFromCenterX / maxDistFromCenter;
               
               // Base intensity (brighter at top and center)
               let intensity = 2 + Math.floor(depthRatio * 3) + Math.floor(centerRatio * 2);
               
               // Add some randomness for texture
               if (Math.random() > 0.7) {
                 intensity += Math.random() > 0.5 ? 1 : -1;
               }
               
               // Clamp to valid range
               intensity = Math.max(1, Math.min(6, intensity));
               
               newBuffer[y][x] = intensity;
             }
           }
         }
       }
      
             // Draw sand in bottom chamber (increasing)
       const bottomChamberStart = middleY + 1;
       const bottomChamberEnd = rows - 2;
       
       for (let i = 0; i < fallenRows; i++) {
         const y = bottomChamberEnd - i;
         if (y >= bottomChamberStart && y < rows) {
           // Calculate internal width (excluding walls)
           const distFromMiddle = Math.abs(y - middleY);
           const maxDist = Math.floor(rows / 2) - 1;
           const ratio = distFromMiddle / maxDist;
           const wallWidth = Math.max(1, Math.floor(1 + (halfWidth - 1) * ratio));
           
           const leftEdge = centerX - wallWidth + 1;
           const rightEdge = centerX + wallWidth - 1;
           
           for (let x = leftEdge; x <= rightEdge; x++) {
             if (x >= 0 && x < cols && hourglassWalls[y][x] === 0) {
               // Calculate sand intensity for bottom chamber
               const depthFromBottom = bottomChamberEnd - y;
               const heightFromBottom = i;
               const maxHeight = fallenRows - 1;
               
               // Distance from center (for radial gradient effect)
               const distFromCenterX = Math.abs(x - centerX);
               const maxDistFromCenter = rightEdge - leftEdge > 0 ? (rightEdge - leftEdge) / 2 : 1;
               const centerRatio = distFromCenterX / maxDistFromCenter;
               
               // Height ratio (newer sand at top is brighter)
               const heightRatio = maxHeight > 0 ? heightFromBottom / maxHeight : 0;
               
               // Base intensity (darker at bottom, brighter at top and center)
               let intensity = 3 + Math.floor(heightRatio * 2) + Math.floor(centerRatio * 2);
               
               // Bottom layer gets extra darkness (compression effect)
               if (i === 0) {
                 intensity += 1;
               }
               
               // Recently fallen sand (top layer) gets extra brightness
               if (i === fallenRows - 1 && fallenRows > 1) {
                 intensity = Math.max(1, intensity - 2);
               }
               
               // Add some randomness for texture
               if (Math.random() > 0.8) {
                 intensity += Math.random() > 0.5 ? 1 : -1;
               }
               
               // Clamp to valid range
               intensity = Math.max(1, Math.min(6, intensity));
               
               newBuffer[y][x] = intensity;
             }
           }
         }
       }
      
             // Falling sand stream through the narrow opening
       if (fallenRows > 0 && fallenRows < totalSandRows) {
         if (Math.random() > 0.4) { // Some randomness in the stream
           if (centerX >= 0 && centerX < cols) {
             // Falling sand has dynamic intensity based on fall progress
             const streamIntensity = 1 + Math.floor(Math.random() * 3); // Range 1-3 for bright falling sand
             newBuffer[middleY][centerX] = streamIntensity;
           }
         }
       }
    } else {
      // Pause - all sand in bottom chamber
      const bottomChamberStart = middleY + 1;
      const bottomChamberEnd = rows - 2;
      
      for (let y = bottomChamberStart; y <= bottomChamberEnd; y++) {
        // Calculate internal width (excluding walls)
        const distFromMiddle = Math.abs(y - middleY);
        const maxDist = Math.floor(rows / 2) - 1;
        const ratio = distFromMiddle / maxDist;
        const wallWidth = Math.max(1, Math.floor(1 + (halfWidth - 1) * ratio));
        
        const leftEdge = centerX - wallWidth + 1;
        const rightEdge = centerX + wallWidth - 1;
        
        for (let x = leftEdge; x <= rightEdge; x++) {
          if (x >= 0 && x < cols && hourglassWalls[y][x] === 0) {
            newBuffer[y][x] = 6; // Sand color
          }
        }
      }
    }

         // Draw hourglass walls
     for (let y = 0; y < rows; y++) {
       for (let x = 0; x < cols; x++) {
         if (hourglassWalls[y][x] === 1) {
           newBuffer[y][x] = 7; // Wall color (darkest for contrast)
         }
       }
     }

    return newBuffer;
  }, [rows, cols]);

  const generateFireFrame = useCallback((frameCount: number) => {
    const buffer = animationBufferRef.current;
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

    return newBuffer;
  }, [rows, cols]);

  // Main animation loop
  useEffect(() => {
    if (animationType === 'none') return;
    
    let frameCount = 0;
    
    const animate = () => {
      frameCount++;
      
      // Only update animation every 3 frames to reduce CPU usage
      if (frameCount % 3 === 0) {
        let newBuffer: number[][];
        
        if (animationType === 'fire') {
          newBuffer = generateFireFrame(frameCount);
        } else if (animationType === 'hourglass') {
          newBuffer = generateHourglassFrame(frameCount);
        } else {
          return;
        }

        animationBufferRef.current = newBuffer;

        // Update pixel colors
        if (!isScattered) {
          const colors = animationType === 'fire' ? fireColors : hourglassColors;
          
          pixels.forEach((pixel, index) => {
            const pixelElement = pixelRefs.current[index];
            if (pixelElement) {
              const level = newBuffer[pixel.gridY][pixel.gridX];
              const color = level > 0 ? colors[7 - level] : pixelColor;
              pixelElement.style.backgroundColor = color;
              
              // Add subtle glow effect for active pixels
              if (level > 3) {
                pixelElement.style.boxShadow = `0 0 ${3 + level}px ${color}`;
              } else if (level > 0) {
                pixelElement.style.boxShadow = `0 0 3px ${color}`;
              } else {
                pixelElement.style.boxShadow = 'none';
              }
            }
          });
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [pixels, rows, cols, isScattered, animationType, fireColors, hourglassColors, pixelColor, generateFireFrame, generateHourglassFrame]);

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