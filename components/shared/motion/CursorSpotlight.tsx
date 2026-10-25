"use client";

import React, { useRef, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { cn } from "@/lib/utils";

interface CursorSpotlightProps {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
  spotlightSize?: number;
}

/**
 * Atmospheric cursor spotlight for dark haute joaillerie galleries.
 * Follows the pointer with soft liquid spring physics, creating a subtle
 * warm lantern / caustic beam across the dark obsidian background.
 */
export function CursorSpotlight({
  children,
  className = "",
  spotlightColor = "rgba(212, 175, 55, 0.08)", // subtle Place Vendôme gold
  spotlightSize = 480,
}: CursorSpotlightProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);

  // Smooth buttery follow physics
  const springX = useSpring(mouseX, { stiffness: 180, damping: 28 });
  const springY = useSpring(mouseY, { stiffness: 180, damping: 28 });

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!containerRef.current || e.pointerType === "touch") return;
      const rect = containerRef.current.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    },
    [mouseX, mouseY]
  );

  return (
    <div
      ref={containerRef}
      onPointerEnter={() => setIsHovered(true)}
      onPointerMove={handlePointerMove}
      onPointerLeave={() => setIsHovered(false)}
      className={cn("relative overflow-hidden", className)}
    >
      {/* Interactive Caustic Spotlight Beam */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl transition-opacity duration-700 -z-0"
        style={{
          left: springX,
          top: springY,
          width: spotlightSize,
          height: spotlightSize,
          background: `radial-gradient(circle, ${spotlightColor} 0%, transparent 70%)`,
          opacity: isHovered ? 1 : 0,
        }}
      />

      <div className="relative z-10">{children}</div>
    </div>
  );
}
