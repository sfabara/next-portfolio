"use client"

import { LayoutWrapper } from "@/components/ui/layout-wrapper"
import { MaskedDiv, GridPattern, DotPattern } from "@/components/ui/masked-div"
import { motion } from "framer-motion"
import WrapButton from "@/components/ui/wrap-button"
import { Card } from "@/components/ui/card"
import { StickySection, StickySectionsContainer } from "@/components/ui/sticky-sections"

export default function Home() {
  return (
    <LayoutWrapper>
      {/* Main Section with Grid Layout */}
      <section className="relative min-h-screen overflow-hidden bg-[#1a1918]">
        {/* Background Grid Pattern */}
        <div className="absolute inset-0">
          <GridPattern className="opacity-20 stroke-[#3B3A3A]" />
        </div>
        
        {/* Main Content Container */}
        <div className="relative z-10 container mx-auto px-4 pt-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[calc(100vh-6rem)]">
            
            {/* Left Column - About Info */}
            <div className="lg:col-span-3 flex flex-col justify-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-[#f5f3ee] dark:bg-[#1f1e1d] rounded-2xl p-6 border border-[#3B3A3A]"
              >
                <h3 className="text-sm font-medium text-[#3B3A3A] dark:text-gray-400 mb-2">
                  DEVELOPER
                </h3>
                <h2 className="text-2xl font-bold text-[#151515] dark:text-white mb-4">
                  Full-Stack Engineer
                </h2>
                <p className="text-sm text-[#3B3A3A] dark:text-gray-500 leading-relaxed">
                  Passionate about creating beautiful, functional, and user-centered digital experiences 
                  with modern web technologies.
                </p>
              </motion.div>
            </div>

            {/* Center Column - Main Feature */}
            <div className="lg:col-span-6 flex items-center justify-center">
              <MaskedDiv gradient="radial" className="w-full">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                  className="bg-[#e8d5b8] dark:bg-[#2a2928] rounded-3xl p-8 lg:p-12 border border-[#3B3A3A] shadow-2xl"
                >
                  {/* Specification Header */}
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-sm font-medium text-[#3B3A3A] dark:text-gray-400">
                      EXPERTISE
                    </h3>
                    <div className="flex gap-2">
                      <span className="text-xs px-3 py-1 bg-[#f5f3ee] dark:bg-[#1f1e1d] rounded-full text-[#3B3A3A] dark:text-gray-400">
                        FRONTEND
                      </span>
                      <span className="text-xs px-3 py-1 bg-[#f5f3ee] dark:bg-[#1f1e1d] rounded-full text-[#3B3A3A] dark:text-gray-400">
                        BACKEND
                      </span>
                    </div>
                  </div>

                  {/* Main Content */}
                  <div className="text-center mb-12">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.6 }}
                      className="mb-8"
                    >
                      <h1 className="text-4xl lg:text-6xl font-bold mb-2 text-[#151515] dark:text-white">
                        Crafting Digital
                      </h1>
                      <p className="text-2xl lg:text-3xl font-bold text-[#fe7500] dark:text-[#ff3f17]">
                        Experiences
                      </p>
                    </motion.div>

                    {/* Skills Grid */}
                    <div className="grid grid-cols-3 gap-4 mb-8">
                      <div className="bg-[#f5f3ee] dark:bg-[#1f1e1d] rounded-lg p-4 border border-[#3B3A3A]">
                        <p className="text-xs text-[#3B3A3A] dark:text-gray-500">React</p>
                      </div>
                      <div className="bg-[#f5f3ee] dark:bg-[#1f1e1d] rounded-lg p-4 border border-[#3B3A3A]">
                        <p className="text-xs text-[#3B3A3A] dark:text-gray-500">Next.js</p>
                      </div>
                      <div className="bg-[#f5f3ee] dark:bg-[#1f1e1d] rounded-lg p-4 border border-[#3B3A3A]">
                        <p className="text-xs text-[#3B3A3A] dark:text-gray-500">TypeScript</p>
                      </div>
                      <div className="bg-[#f5f3ee] dark:bg-[#1f1e1d] rounded-lg p-4 border border-[#3B3A3A]">
                        <p className="text-xs text-[#3B3A3A] dark:text-gray-500">Node.js</p>
                      </div>
                      <div className="bg-[#f5f3ee] dark:bg-[#1f1e1d] rounded-lg p-4 border border-[#3B3A3A]">
                        <p className="text-xs text-[#3B3A3A] dark:text-gray-500">Python</p>
                      </div>
                      <div className="bg-[#f5f3ee] dark:bg-[#1f1e1d] rounded-lg p-4 border border-[#3B3A3A]">
                        <p className="text-xs text-[#3B3A3A] dark:text-gray-500">AWS</p>
                      </div>
                    </div>

                    {/* Experience Info */}
                    <div className="mb-8">
                      <h4 className="text-sm font-medium text-[#3B3A3A] dark:text-gray-400 mb-2">
                        EXPERIENCE
                      </h4>
                      <p className="text-sm text-[#3B3A3A] dark:text-gray-500">
                        Building scalable web applications and delivering exceptional user experiences for 5+ years.
                      </p>
                    </div>

                    {/* CTA Button */}
                    <WrapButton href="/projects">
                      VIEW PROJECTS
                    </WrapButton>
                  </div>
                </motion.div>
              </MaskedDiv>
            </div>

            {/* Right Column - Feature Cards */}
           
          </div>
        </div>
        <div className="relative z-10 container mx-auto px-4 pt-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[calc(100vh-6rem)]">
            
            {/* Left Column - About Info */}
            <div className="lg:col-span-3 flex flex-col justify-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-[#f5f3ee] dark:bg-[#1f1e1d] rounded-2xl p-6 border border-[#3B3A3A]"
              >
                <h3 className="text-sm font-medium text-[#3B3A3A] dark:text-gray-400 mb-2">
                  DEVELOPER
                </h3>
                <h2 className="text-2xl font-bold text-[#151515] dark:text-white mb-4">
                  Full-Stack Engineer
                </h2>
                <p className="text-sm text-[#3B3A3A] dark:text-gray-500 leading-relaxed">
                  Passionate about creating beautiful, functional, and user-centered digital experiences 
                  with modern web technologies.
                </p>
              </motion.div>
            </div>

            {/* Center Column - Main Feature */}
            <div className="lg:col-span-6 flex items-center justify-center">
              <MaskedDiv gradient="radial" className="w-full">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                  className="bg-[#e8d5b8] dark:bg-[#2a2928] rounded-3xl p-8 lg:p-12 border border-[#3B3A3A] shadow-2xl"
                >
                  {/* Specification Header */}
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-sm font-medium text-[#3B3A3A] dark:text-gray-400">
                      EXPERTISE
                    </h3>
                    <div className="flex gap-2">
                      <span className="text-xs px-3 py-1 bg-[#f5f3ee] dark:bg-[#1f1e1d] rounded-full text-[#3B3A3A] dark:text-gray-400">
                        FRONTEND
                      </span>
                      <span className="text-xs px-3 py-1 bg-[#f5f3ee] dark:bg-[#1f1e1d] rounded-full text-[#3B3A3A] dark:text-gray-400">
                        BACKEND
                      </span>
                    </div>
                  </div>

                  {/* Main Content */}
                  <div className="text-center mb-12">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.6 }}
                      className="mb-8"
                    >
                      <h1 className="text-4xl lg:text-6xl font-bold mb-2 text-[#151515] dark:text-white">
                        Crafting Digital
                      </h1>
                      <p className="text-2xl lg:text-3xl font-bold text-[#fe7500] dark:text-[#ff3f17]">
                        Experiences
                      </p>
                    </motion.div>

                    {/* Skills Grid */}
                    <div className="grid grid-cols-3 gap-4 mb-8">
                      <div className="bg-[#f5f3ee] dark:bg-[#1f1e1d] rounded-lg p-4 border border-[#3B3A3A]">
                        <p className="text-xs text-[#3B3A3A] dark:text-gray-500">React</p>
                      </div>
                      <div className="bg-[#f5f3ee] dark:bg-[#1f1e1d] rounded-lg p-4 border border-[#3B3A3A]">
                        <p className="text-xs text-[#3B3A3A] dark:text-gray-500">Next.js</p>
                      </div>
                      <div className="bg-[#f5f3ee] dark:bg-[#1f1e1d] rounded-lg p-4 border border-[#3B3A3A]">
                        <p className="text-xs text-[#3B3A3A] dark:text-gray-500">TypeScript</p>
                      </div>
                      <div className="bg-[#f5f3ee] dark:bg-[#1f1e1d] rounded-lg p-4 border border-[#3B3A3A]">
                        <p className="text-xs text-[#3B3A3A] dark:text-gray-500">Node.js</p>
                      </div>
                      <div className="bg-[#f5f3ee] dark:bg-[#1f1e1d] rounded-lg p-4 border border-[#3B3A3A]">
                        <p className="text-xs text-[#3B3A3A] dark:text-gray-500">Python</p>
                      </div>
                      <div className="bg-[#f5f3ee] dark:bg-[#1f1e1d] rounded-lg p-4 border border-[#3B3A3A]">
                        <p className="text-xs text-[#3B3A3A] dark:text-gray-500">AWS</p>
                      </div>
                    </div>

                    {/* Experience Info */}
                    <div className="mb-8">
                      <h4 className="text-sm font-medium text-[#3B3A3A] dark:text-gray-400 mb-2">
                        EXPERIENCE
                      </h4>
                      <p className="text-sm text-[#3B3A3A] dark:text-gray-500">
                        Building scalable web applications and delivering exceptional user experiences for 5+ years.
                      </p>
                    </div>

                    {/* CTA Button */}
                    <WrapButton href="/projects">
                      VIEW PROJECTS
                    </WrapButton>
                  </div>
                </motion.div>
              </MaskedDiv>
            </div>

            {/* Right Column - Feature Cards */}
           
          </div>
        </div>

        {/* Floating Grid Elements */}
        <div className="absolute top-20 left-10 w-32 h-32 border border-[#3B3A3A] rounded-lg opacity-10" />
        <div className="absolute bottom-20 right-20 w-24 h-24 border border-[#3B3A3A] rounded-full opacity-10" />
        <div className="absolute top-1/2 right-10 w-16 h-16 bg-[#fe7500] rounded opacity-10" />
      </section>

     
      
    </LayoutWrapper>
  )
}
