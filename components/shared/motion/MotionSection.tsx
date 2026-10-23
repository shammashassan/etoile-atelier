"use client";

import React from "react";
import { motion } from "motion/react";

interface MotionSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function MotionSection({ children, className = "", delay = 0 }: MotionSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function MotionItem({ children, className = "", delay = 0 }: MotionSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98, y: 16 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}