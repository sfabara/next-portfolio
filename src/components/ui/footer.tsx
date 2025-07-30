"use client";

import React from "react";
import { motion } from "framer-motion";
import { Linkedin, Github, Instagram, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative overflow-hidden">
      {/* Main Footer Section with Gradient */}
      <section className="relative min-h-[60vh] flex items-center justify-center">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#fe7500] via-[#2b2723] to-[#1A1918]" />
        
        {/* Overlay Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 1px, transparent 1px),
                             radial-gradient(circle at 75% 75%, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }} />
        </div>
        
        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            {/* Main Name */}
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold text-white mb-8 leading-none">
              Fabara
            </h1>
            
          </motion.div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-32 h-32 border-2 border-white/20 rounded-full opacity-50" />
        <div className="absolute bottom-20 right-20 w-24 h-24 border-2 border-white/20 rounded-lg opacity-50" />
        <div className="absolute top-1/2 left-20 w-16 h-16 bg-white/10 rounded-full opacity-50" />
        
      </section>
      
      {/* Bottom Footer Bar */}
     
    </footer>
  );
} 