"use client"

import React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import {  Sparkles, Rocket, Database, Shield, Settings, Server } from "lucide-react"
import { Badge } from "./badge"

interface BentoCardProps {
  className?: string
  children?: React.ReactNode
  gradient?: boolean
}

export function BentoCard({ className, children, gradient = false }: BentoCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
      className={cn(
        "relative overflow-hidden rounded-2xl border border-[#3B3A3A] bg-[#f5f3ee] dark:bg-[#2a2928] p-6 shadow-lg transition-all hover:shadow-xl",
        gradient && "bg-gradient-to-br from-purple-600/10 via-pink-600/10 to-blue-600/10",
        className
      )}
    >
      {children}
    </motion.div>
  )
}

export function BentoGrid() {
  return (
    <div className="mx-auto max-w-7xl px-4">
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {/* Hero Card - Full-Stack Product Ownership */}
        <BentoCard className="md:col-span-2 md:row-span-2 bg-gradient-to-br from-[#fe7500] to-[#ff3f17] text-white" gradient>
          <div className="flex h-full flex-col justify-between">
            <div>
              <Badge variant="secondary" className="mb-4 bg-white/20 text-white backdrop-blur-sm">
                <Sparkles className="mr-1 h-3 w-3" />
                Leadership Role
              </Badge>
              <h2 className="mb-2 text-3xl font-bold">Full-Stack Product Ownership</h2>
              <p className="text-white/90">
                Lead end-to-end development of core features across React Native mobile apps, web apps and Node.js/Python backend services. 
                Collaborate closely with design and product teams in fast-paced startup environments to deliver high-quality products.
              </p>
            </div>
            <div className="mt-6 flex items-center justify-between">
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="bg-white/20 text-white text-xs">React Native</Badge>
                <Badge variant="secondary" className="bg-white/20 text-white text-xs">Node.js</Badge>
                <Badge variant="secondary" className="bg-white/20 text-white text-xs">Product Strategy</Badge>
              </div>
            </div>
          </div>
        </BentoCard>

        {/* Infrastructure Card */}
        <BentoCard className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <Server className="h-8 w-8 text-blue-600 mb-3" />
              <h3 className="text-lg font-bold text-[#151515] dark:text-white mb-2">
                Infrastructure & Scalability
              </h3>
              <p className="text-sm text-[#3B3A3A] dark:text-gray-400">
                Architect scalable infrastructure using cutting edge container orchestration and microservices patterns
              </p>
            </div>
          </div>
        </BentoCard>

        {/* DevOps & Security Card */}
        <BentoCard>
          <Shield className="h-8 w-8 text-[#3B3A3A] mb-3" />
          <h3 className="text-lg font-bold text-[#151515] dark:text-white mb-2">
            DevOps & Security
          </h3>
          <p className="text-sm text-[#3B3A3A] dark:text-gray-400">
            Establish secure backend operations leveraging HashiCorp Vault and custom Personal Package Archives (PPAs)—used to distribute secure internal software.
          </p>
        </BentoCard>

        {/* Tools Integration Card */}
        <BentoCard className="md:col-span-2 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20">
          <div className="flex items-start space-x-4">
            <Settings className="h-8 w-8 text-[#ff3f17] flex-shrink-0" />
            <div>
              <h3 className="text-lg font-bold text-[#151515] dark:text-white mb-2">
                Internal Tooling & Systems Integration
              </h3>
              <p className="text-sm text-[#3B3A3A] dark:text-gray-400">
                Build internal monitoring and support tools to increase operational visibility. 
                Integrate with third-party APIs for banking, identity, and market data.
              </p>
              <div className="flex flex-wrap gap-2 mt-3">
                <Badge variant="outline" className="text-xs">API Integration</Badge>
                <Badge variant="outline" className="text-xs">Monitoring</Badge>
                <Badge variant="outline" className="text-xs">Banking APIs</Badge>
              </div>
            </div>
          </div>
        </BentoCard>

        {/* Database Card */}
        <BentoCard>
          <Database className="mb-3 h-8 w-8 text-green-600" />
          <h4 className="mb-1 font-semibold text-[#151515] dark:text-white">Database Design</h4>
          <p className="text-sm text-[#3B3A3A] dark:text-gray-400">
            Design and manage schemas for performance and developer efficiency
          </p>
        </BentoCard>

        {/* Container Tech Card */}
        <BentoCard>
          
            <Rocket className="h-8 w-8 text-purple-600" />
          <h4 className="mb-1 font-semibold text-[#151515] dark:text-white">UI/UX Design</h4>
          <p className="text-sm text-[#3B3A3A] dark:text-gray-400">
            Design and implement intuitive and engaging user interfaces for web and mobile applications using data-driven insights.
          </p>
        </BentoCard>

        {/* CTA Card */}
        <BentoCard className="md:col-span-2 bg-gradient-to-r from-[#3B3A3A] to-[#151515] text-white">
          <div className="flex flex-col justify-between h-full">
            <div>
              <h3 className="text-2xl font-bold">Technical Leadership</h3>
              <p className="text-white/80">Ready to architect your next solution</p>
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => {
                  window.location.href = "mailto:sfabaraa@gmail.com";
                }}
                className="group cursor-pointer border border-[#3B3A3A] bg-[#151515] gap-2 h-[56px] sm:h-[64px] flex items-center p-[8px] sm:p-[11px] rounded-full hover:shadow-lg transition-all duration-300"
              >
                <div className="border border-[#3B3A3A] bg-[#ff3f17] h-[39px] sm:h-[43px] rounded-full flex items-center justify-center text-white">
                  <p className="font-medium tracking-tight mr-2 sm:mr-3 ml-2 flex items-center gap-2 justify-center text-sm sm:text-base">
                    LET'S CONNECT
                  </p>
                </div>
                <div className="text-[#3b3a3a] group-hover:ml-2 ease-in-out transition-all size-[22px] sm:size-[26px] flex items-center justify-center rounded-full border-2 border-[#3b3a3a]">
                  <svg
                    width="16"
                    height="16"
                    className="sm:w-[18px] sm:h-[18px]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              </button>
            </div>
          </div>
        </BentoCard>
      </div>
    </div>
  )
} 