"use client";

import React from "react";
import { motion, useScroll, useSpring } from "motion/react";

/**
 * Hairline Haute Joaillerie scroll progress indicator.
 * Floats at the very top of the viewport in atelier gold.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 280,
    damping: 32,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[2px] bg-accent origin-left z-50 pointer-events-none opacity-90 shadow-[0_1px_8px_rgba(212,175,55,0.45)]"
    />
  );
}
