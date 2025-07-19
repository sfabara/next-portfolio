"use client";

import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

interface StickySectionProps {
  title: string;
  content: React.ReactNode;
  backgroundColor?: string;
  textColor?: string;
}

export function StickySection({ 
  title, 
  content, 
  backgroundColor = "bg-[#f5f3ee] dark:bg-[#1f1e1d]",
  textColor = "text-[#151515] dark:text-white"
}: StickySectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    
    if (!section || !content) return;

    // Create the sticky animation
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: "top 88px", // Start when section hits below the fixed header (adjust based on your header height)
        end: "bottom 88px",
        pin: true,
        pinSpacing: false,
        animation: gsap.timeline()
          .from(content, {
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: "power2.out"
          })
          .to(content, {
            opacity: 0,
            y: -30,
            duration: 0.8,
            ease: "power2.in"
          }, "+=2"), // Keep visible for 2 seconds before fading out
        scrub: 1,
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="min-h-screen relative">
      <div 
        ref={contentRef}
        className={`${backgroundColor} ${textColor} rounded-2xl border border-[#3B3A3A] p-8 md:p-12 mx-4 md:mx-8 shadow-lg`}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-6">{title}</h2>
        <div className="space-y-4">
          {content}
        </div>
      </div>
    </div>
  );
}

export function StickySectionsContainer({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      // Refresh ScrollTrigger when images load or content changes
      ScrollTrigger.refresh();
    });

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative">
      {children}
    </div>
  );
} 