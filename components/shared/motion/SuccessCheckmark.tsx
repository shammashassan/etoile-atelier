"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface SuccessCheckmarkProps {
  className?: string;
  size?: number;
}

export function SuccessCheckmark({ className, size = 48 }: SuccessCheckmarkProps) {
  return (
    <div className={cn("inline-flex items-center justify-center", className)}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 52 52"
        className="size-full stroke-primary"
        fill="none"
      >
        <motion.circle
          cx="26"
          cy="26"
          r="24"
          strokeWidth="2"
          stroke="currentColor"
          className="opacity-20"
        />
        <motion.circle
          cx="26"
          cy="26"
          r="24"
          strokeWidth="2"
          stroke="currentColor"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        />
        <motion.path
          d="M14 27l8 8 16-16"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          stroke="currentColor"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.45, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        />
      </svg>
    </div>
  );
}
