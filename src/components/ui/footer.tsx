"use client";

import React from "react";
import { motion } from "framer-motion";
import { Linkedin, Github, Instagram, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-2 border-card rounded-xl m-5 p-5">
      {/* Main Footer Section with Gradient */}
      <section className="relative min-h-[60vh] flex items-center justify-center">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#fe7500] via-[#2b2723] to-[#1A1918] rounded-xl" />
        
        
        {/* Content */}
        {/* Main Name - Bottom of Footer */}
        <div className="absolute bottom-0 left-0 w-full z-10 flex flex-col items-center pb-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-1"
          >
            <h1 className="text-md font-bold text-white leading-none text-center">
              Made with ❤️ by Sebastian Fabara
            </h1>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xs text-gray-200 text-center"
          >
            built with <span className="font-semibold text-[#382c23]">Next.js</span>, <span className="font-semibold text-[#382c23]">shadcn</span>, <span className="font-semibold text-[#382c23]">tailwind</span>
          </motion.div>
        </div>
      </section>
    </footer>
  );
} 