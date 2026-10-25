"use client";

import React, { useRef, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring, type HTMLMotionProps } from "motion/react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface MagneticButtonProps extends HTMLMotionProps<"button"> {
  children: React.ReactNode;
  strength?: number;
  showArrow?: boolean;
  arrowClassName?: string;
}

/**
 * Magnetic button inspired by high-end luxury portfolio sites (Awwwards / Place Vendôme ateliers).
 * Pulls subtly toward cursor when hovered, then springs smoothly back into place on leave.
 * Features an animated arrow with the transitions-dev learn-more-hover pattern.
 */
export function MagneticButton({
  children,
  className,
  strength = 0.35,
  showArrow = true,
  arrowClassName,
  ...props
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Raw coordinate offsets
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Damped spring physics (luxury feel: smooth, high damping, zero cartoonish bounce)
  const springConfig = { stiffness: 280, damping: 24, mass: 0.6 };
  const smoothX = useSpring(x, springConfig);
  const smoothY = useSpring(y, springConfig);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLButtonElement>) => {
      if (!buttonRef.current) return;
      if (e.pointerType === "touch") return;

      const rect = buttonRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distanceX = (e.clientX - centerX) * strength;
      const distanceY = (e.clientY - centerY) * strength;

      x.set(distanceX);
      y.set(distanceY);
    },
    [strength, x, y]
  );

  const handlePointerLeave = useCallback(() => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.button
      ref={buttonRef}
      onPointerEnter={() => setIsHovered(true)}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      whileTap={{ scale: 0.96 }}
      style={{ x: smoothX, y: smoothY }}
      className={cn(
        "group relative inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-base font-medium transition-colors select-none",
        "bg-primary text-primary-foreground hover:bg-primary/95",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className
      )}
      {...props}
    >
      <span className="relative z-10 transition-transform duration-300 ease-out group-hover:translate-x-0.5">
        {children}
      </span>

      {showArrow && (
        <span className="relative z-10 flex items-center overflow-hidden w-4 h-4">
          <ArrowRight
            className={cn(
              "size-4 shrink-0 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1",
              arrowClassName
            )}
          />
        </span>
      )}

      {/* Subtle gold specular rim highlight */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 border border-white/15 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
    </motion.button>
  );
}
