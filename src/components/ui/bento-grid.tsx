"use client"

import React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { ArrowRight, Sparkles, Zap, Globe, Code2, Palette, Rocket } from "lucide-react"
import { Badge } from "./badge"
import { Button } from "./button"
import FlipLink from "./text-effect-flipper"

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
        "relative overflow-hidden rounded-2xl border border-border/50 bg-card p-6 shadow-lg transition-all hover:shadow-xl",
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
    <div className="mx-auto max-w-7xl px-4 py-20">
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {/* Hero Card - Spans 2 cols and 2 rows */}
        <BentoCard className="md:col-span-2 md:row-span-2 bg-gradient-to-br from-purple-600 to-pink-600 text-white" gradient>
          <div className="flex h-full flex-col justify-between">
            <div>
              <Badge variant="secondary" className="mb-4 bg-white/20 text-white backdrop-blur-sm">
                <Sparkles className="mr-1 h-3 w-3" />
                Featured Project
              </Badge>
              <h2 className="mb-2 text-3xl font-bold">Modern Portfolio</h2>
              <p className="text-white/80">
                A stunning portfolio built with Next.js, Tailwind CSS, and Framer Motion
              </p>
            </div>
            <div className="mt-6 flex items-center justify-between">
              <Button variant="secondary" className="bg-white/20 text-white hover:bg-white/30">
                View Project <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-10 w-10 rounded-full border-2 border-white bg-gradient-to-br from-purple-400 to-pink-400"
                  />
                ))}
              </div>
            </div>
          </div>
        </BentoCard>

        {/* Stats Card */}
        <BentoCard className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Projects</p>
              <p className="text-3xl font-bold">24</p>
            </div>
            <Zap className="h-8 w-8 text-blue-600" />
          </div>
        </BentoCard>

        {/* Skills Card */}
        <BentoCard>
          <h3 className="mb-4 text-lg font-semibold">Tech Stack</h3>
          <div className="flex flex-wrap gap-2">
            {["React", "Next.js", "TypeScript", "Tailwind"].map((skill) => (
              <Badge key={skill} variant="outline">
                {skill}
              </Badge>
            ))}
          </div>
        </BentoCard>

        {/* Image Card */}
        <BentoCard className="p-0">
          <div className="relative h-full min-h-[200px] w-full">
            <Image
              src="/api/placeholder/400/300"
              alt="Project preview"
              fill
              className="object-cover rounded-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-2xl" />
            <div className="absolute bottom-4 left-4 right-4">
              <p className="text-sm font-medium text-white">E-commerce Platform</p>
            </div>
          </div>
        </BentoCard>

        {/* Quote Card */}
        <BentoCard className="md:col-span-2 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20">
          <blockquote className="text-lg font-medium">
            "Design is not just what it looks like and feels like. Design is how it works."
          </blockquote>
          <p className="mt-2 text-sm text-muted-foreground">- Steve Jobs</p>
        </BentoCard>

        {/* Services Cards */}
        <BentoCard>
          <Globe className="mb-3 h-8 w-8 text-green-600" />
          <h4 className="mb-1 font-semibold">Web Development</h4>
          <p className="text-sm text-muted-foreground">
            Building fast, responsive websites
          </p>
        </BentoCard>

        <BentoCard>
          <Code2 className="mb-3 h-8 w-8 text-blue-600" />
          <h4 className="mb-1 font-semibold">App Development</h4>
          <p className="text-sm text-muted-foreground">
            Creating mobile & web applications
          </p>
        </BentoCard>

        {/* CTA Card */}
        <BentoCard className="md:col-span-2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold">Let's Work Together</h3>
              <p className="text-white/80">Turn your ideas into reality</p>
            </div>
            <Button variant="secondary" size="lg" className="bg-white text-violet-600 hover:bg-white/90">
              Get Started
            </Button>
          </div>
        </BentoCard>

        {/* Interactive Card */}
        <BentoCard className="group cursor-pointer">
          <div className="transition-transform group-hover:scale-105">
            <Palette className="mb-3 h-8 w-8 text-pink-600" />
            <h4 className="mb-1 font-semibold">UI/UX Design</h4>
            <p className="text-sm text-muted-foreground">
              Creating beautiful interfaces
            </p>
          </div>
        </BentoCard>

        {/* Animation Card */}
        <BentoCard>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="mb-3"
          >
            <Rocket className="h-8 w-8 text-purple-600" />
          </motion.div>
          <h4 className="mb-1 font-semibold">Innovation</h4>
          <p className="text-sm text-muted-foreground">
            Always exploring new tech
          </p>
        </BentoCard>
      </div>
    </div>
  )
} 