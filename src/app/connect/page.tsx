"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Connect = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const terminalRef = useRef<HTMLDivElement>(null);

  const steps = [
    { type: 'output', content: '> INITIALIZING SECURE CONNECTION...' },
    { type: 'output', content: '> LOADING CONTACT PROTOCOL...' },
    { type: 'output', content: '> STATUS: [ONLINE] READY FOR INPUT' },
    { type: 'output', content: '> ENTER YOUR EMAIL ADDRESS:' },
    { type: 'input', field: 'email' },
    { type: 'output', content: '> EMAIL VALIDATED ✓' },
    { type: 'output', content: '> ENTER YOUR MESSAGE:' },
    { type: 'input', field: 'message' },
    { type: 'output', content: '> MESSAGE RECEIVED ✓' },
    { type: 'output', content: '> EXECUTING SEND_MESSAGE.EXE...' },
    { type: 'output', content: '> CONNECTION ESTABLISHED ✓' }
  ];

  const asciiArt = `
    ╔═══════════════════════════════════════╗
    ║  ██████╗ ██████╗ ███╗   ██╗███╗   ██╗ ║
    ║ ██╔════╝██╔═══██╗████╗  ██║████╗  ██║ ║
    ║ ██║     ██║   ██║██╔██╗ ██║██╔██╗ ██║ ║
    ║ ██║     ██║   ██║██║╚██╗██║██║╚██╗██║ ║
    ║ ╚██████╗╚██████╔╝██║ ╚████║██║ ╚████║ ║
    ║  ╚═════╝ ╚═════╝ ╚═╝  ╚═══╝╚═╝  ╚═══╝ ║
    ╚═══════════════════════════════════════╝
  `;

  useEffect(() => {
    const timer = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 1200);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [currentStep]);

  const handleSubmit = async () => {
    if (email && message && currentStep === steps.length - 3) {
      setIsTyping(true);
      setTimeout(() => {
        setCurrentStep(prev => prev + 1);
        setIsTyping(false);
        setTimeout(() => {
          setCurrentStep(prev => prev + 1);
          setTimeout(() => {
            setCurrentStep(prev => prev + 1);
          }, 1500);
        }, 1000);
      }, 2000);
    }
  };

  const handleInputSubmit = (field: string, value: string) => {
    if (field === 'email') {
      setEmail(value);
      setTimeout(() => setCurrentStep(prev => prev + 1), 500);
      setTimeout(() => setCurrentStep(prev => prev + 1), 1500);
    } else if (field === 'message') {
      setMessage(value);
      setTimeout(() => setCurrentStep(prev => prev + 1), 500);
      handleSubmit();
    }
  };

  const TerminalLine = ({ step, index }: { step: any, index: number }) => {
    const [displayText, setDisplayText] = useState('');
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
      if (step.type === 'output') {
        let i = 0;
        const typeWriter = () => {
          if (i < step.content.length) {
            setDisplayText(step.content.slice(0, i + 1));
            i++;
            setTimeout(typeWriter, 30);
          } else {
            setIsComplete(true);
            setTimeout(() => {
              if (currentStep === index) {
                setCurrentStep(prev => prev + 1);
              }
            }, 1000);
          }
        };
        typeWriter();
      } else {
        setIsComplete(true);
      }
    }, []);

    if (step.type === 'input') {
      return (
        <TerminalInput 
          field={step.field}
          onSubmit={handleInputSubmit}
        />
      );
    }

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-mono text-[#00ff41] text-sm leading-relaxed"
      >
        <span className="text-[#ff8c00]">root@hackerterminal:~$ </span>
        {displayText}
        {!isComplete && <span className="bg-[#00ff41] text-black animate-pulse">█</span>}
      </motion.div>
    );
  };

  const TerminalInput = ({ field, onSubmit }: { field: string, onSubmit: (field: string, value: string) => void }) => {
    const [inputValue, setInputValue] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, []);

    const handleKeyPress = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && inputValue.trim()) {
        setIsSubmitted(true);
        onSubmit(field, inputValue);
      }
    };

    if (isSubmitted) {
      return (
        <div className="font-mono text-[#00ff41] text-sm">
          <span className="text-[#ff8c00]">root@hackerterminal:~$ </span>
          <span className="text-[#00ff41]">{inputValue}</span>
        </div>
      );
    }

    return (
      <motion.div 
        className="relative p-3 my-4 border-2 border-[#ff8c00] rounded bg-[#1a1a1a] bg-opacity-50"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ 
          opacity: 1, 
          scale: 1,
          boxShadow: ['0 0 10px rgba(255,140,0,0.3)', '0 0 20px rgba(255,140,0,0.5)', '0 0 10px rgba(255,140,0,0.3)']
        }}
        transition={{ 
          duration: 0.5,
          boxShadow: { repeat: Infinity, duration: 2 }
        }}
      >
        {/* Input prompt indicator */}
        <div className="text-[#ff8c00] font-mono text-xs mb-2 font-bold tracking-wider uppercase">
          ⚡ INPUT REQUIRED - {field === 'email' ? 'EMAIL ADDRESS' : 'MESSAGE'} ⚡
        </div>
        
        <div className="font-mono text-[#00ff41] text-sm flex items-center">
          <span className="text-[#ff8c00]">root@hackerterminal:~$ </span>
          <input
            ref={inputRef}
            type={field === 'email' ? 'email' : field === 'message' ? 'text' : 'text'}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            className="bg-transparent border-none outline-none text-[#00ff41] caret-[#00ff41] flex-1 placeholder-[#ff8c00] placeholder-opacity-60"
            placeholder={field === 'email' ? 'Enter your email address...' : 'Enter your message...'}
            autoComplete="off"
          />
          <span className="bg-[#00ff41] text-black animate-pulse">█</span>
        </div>
        
        {/* Help text */}
        <div className="text-[#ff8c00] font-mono text-xs mt-2 opacity-70">
          Press ENTER to continue...
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-[#000000] p-4 flex items-center justify-center">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-4xl"
      >
        {/* Terminal Header */}
        <div className="bg-[#1a1a1a] border-2 border-[#ff8c00] rounded-t-lg p-3 relative overflow-hidden">
          {/* Scanlines effect */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,140,0,0.03) 2px, rgba(255,140,0,0.03) 4px)',
              zIndex: 1
            }}
          />
          
          {/* Header content */}
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-[#00ff41] rounded-full animate-pulse"></div>
            </div>
            <div className="text-[#ff8c00] font-mono text-sm font-bold tracking-wider">
              SECURE_TERMINAL_v2.1.exe
            </div>
            <div className="text-[#00ff41] font-mono text-xs">
              STATUS: ONLINE
            </div>
          </div>
        </div>

        {/* Terminal Body */}
        <div className="bg-[#0a0a0a] border-2 border-t-0 border-[#ff8c00] rounded-b-lg p-6 relative min-h-[600px] overflow-hidden">
          {/* Scanlines effect */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,65,0.02) 2px, rgba(0,255,65,0.02) 4px)',
              zIndex: 1
            }}
          />
          
          {/* Corner decorations */}
          <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-[#ff8c00]" />
          <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-[#ff8c00]" />
          <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-[#ff8c00]" />
          <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-[#ff8c00]" />

          <div ref={terminalRef} className="relative z-10 h-full overflow-auto">
            {/* ASCII Art Header */}
            <motion.pre 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 0.7, y: 0 }}
              className="text-[#ff8c00] text-xs leading-tight mb-6 overflow-x-auto opacity-70"
              style={{ fontFamily: 'monospace' }}
            >
              {asciiArt}
            </motion.pre>

            {/* Terminal Lines */}
            <div className="space-y-2">
              <AnimatePresence>
                {steps.slice(0, currentStep + 1).map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <TerminalLine step={step} index={index} />
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Loading indicator when typing */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="font-mono text-[#ff8c00] text-sm"
                >
                  <span className="animate-pulse">Processing</span>
                  <motion.span
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >...</motion.span>
                  <span className="bg-[#ff8c00] text-black animate-pulse ml-2">█</span>
                </motion.div>
              )}
            </div>

            {/* Success Message */}
            {currentStep >= steps.length && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-8 p-4 border-2 border-[#00ff41] rounded bg-[#001a0a] relative"
              >
                <div className="text-[#00ff41] font-mono text-center">
                  <div className="text-lg font-bold mb-2">
                    ✓ MESSAGE TRANSMITTED SUCCESSFULLY
                  </div>
                  <div className="text-sm opacity-80">
                    Connection established. Response incoming...
                  </div>
                  <div className="mt-4 text-xs">
                    Email: {email} | Message Length: {message.length} chars
                  </div>
                </div>
                
                {/* Success glow effect */}
                <div className="absolute inset-0 bg-[#00ff41] opacity-5 rounded animate-pulse" />
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Connect;