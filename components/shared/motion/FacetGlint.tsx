"use client";

import React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface FacetGlintProps {
  className?: string;
  delay?: number;
}

/**
 * Prismatic facet glint overlay for jewelry cards.
 * Simulates genuine diamond dispersion / rainbow caustic flares when hovered.
 */
export function FacetGlint({ className, delay = 0 }: FacetGlintProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden mix-blend-screen opacity-0 transition-opacity duration-500 group-hover:opacity-100",
        className
      )}
    >
      {/* Sweeping diagonal light beam */}
      <motion.div
        initial={{ x: "-100%", y: "-100%" }}
        whileHover={{
          x: "200%",
          y: "200%",
          transition: {
            duration: 1.4,
            ease: [0.16, 1, 0.3, 1],
            delay,
            repeat: Infinity,
            repeatDelay: 3.5,
          },
        }}
        className="absolute -inset-full h-[300%] w-[60%] rotate-45 bg-gradient-to-r from-transparent via-white/20 to-transparent blur-sm"
      />

      {/* Subtle diamond chromatic prism flare */}
      <div className="absolute top-1/4 left-1/3 size-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-radial from-amber-200/25 via-cyan-200/15 to-transparent blur-md opacity-0 group-hover:opacity-80 transition-opacity duration-700" />
    </div>
  );
}
