"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, MotionValue } from "motion/react";
import { cn } from "@/lib/utils";

interface ScrollParallaxProps {
  children: React.ReactNode;
  className?: string;
  /** Vertical travel distance in pixels. Positive moves down-to-up (anticipating scroll), negative moves down */
  offsetY?: number;
  /** Enable buttery spring physics for natural weighted momentum */
  spring?: boolean;
  /** Whether to clip contents to container bounds */
  clip?: boolean;
}

/**
 * ScrollParallax: High-jewelry editorial scroll parallax.
 * Provides subtle, weighted vertical drift synchronized with scroll progress.
 */
export function ScrollParallax({
  children,
  className = "",
  offsetY = 30,
  spring = true,
  clip = false,
}: ScrollParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Calculate raw parallax transform: starts at +offsetY when entering viewport, moves to -offsetY when leaving
  const rawY = useTransform(scrollYProgress, [0, 1], [offsetY, -offsetY]);

  // Spring physics for velvet-smooth luxury inertia
  const smoothY = useSpring(rawY, {
    stiffness: 140,
    damping: 26,
    mass: 0.25,
  });

  const y: MotionValue<number> = spring ? smoothY : rawY;

  return (
    <div
      ref={ref}
      className={cn("relative will-change-transform", clip && "overflow-hidden", className)}
    >
      <motion.div style={{ y }} className="w-full h-full">
        {children}
      </motion.div>
    </div>
  );
}
