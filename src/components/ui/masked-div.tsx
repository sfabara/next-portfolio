"use client"

import React from "react"
import { cn } from "@/lib/utils"

interface MaskedDivProps {
  children: React.ReactNode
  className?: string
  maskClassName?: string
  gradient?: "radial" | "linear" | "conic"
}

export function MaskedDiv({ 
  children, 
  className, 
  maskClassName,
  gradient = "radial" 
}: MaskedDivProps) {
  const gradientClasses = {
    radial: "bg-gradient-radial from-transparent via-background/50 to-background",
    linear: "bg-gradient-to-b from-transparent via-background/50 to-background",
    conic: "bg-gradient-conic from-transparent via-background/50 to-background"
  }

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {children}
      <div 
        className={cn(
          "pointer-events-none absolute inset-0",
          gradientClasses[gradient],
          maskClassName
        )}
        style={{
          maskImage: "radial-gradient(ellipse at center, transparent 40%, black 70%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, transparent 40%, black 70%)",
        }}
      />
    </div>
  )
}

export function GridPattern({ className }: { className?: string }) {
  return (
    <svg
      className={cn(
        "absolute inset-0 h-full w-full stroke-gray-200 dark:stroke-gray-800 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]",
        className
      )}
      aria-hidden="true"
    >
      <defs>
        <pattern
          id="grid-pattern"
          width={40}
          height={40}
          x="50%"
          y={-1}
          patternUnits="userSpaceOnUse"
        >
          <path d="M40 0L0 0 0 40" fill="none" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" strokeWidth={0} fill="url(#grid-pattern)" />
      {/* Add horizontal and vertical lines for complete grid */}
      <g>
        <path d="M 0,0 L 0,100%" stroke="currentColor" strokeWidth="1" opacity="0.1" />
        <path d="M 0,0 L 100%,0" stroke="currentColor" strokeWidth="1" opacity="0.1" />
      </g>
    </svg>
  )
}

export function DotPattern({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "absolute inset-0 h-full w-full",
        className
      )}
    >
      <svg className="h-full w-full">
        <defs>
          <pattern
            id="dot-pattern"
            x="0"
            y="0"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="2" cy="2" r="1" className="fill-gray-300 dark:fill-gray-700" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dot-pattern)" />
      </svg>
    </div>
  )
}
