"use client";

import React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface MetalSelectorProps {
  metals: string[];
  selectedMetal: string;
  onSelect: (metal: string) => void;
  className?: string;
}

const METAL_COLORS: Record<string, string> = {
  "22k Yellow Gold": "#E8B038",
  "18k Yellow Gold": "#D4AF37",
  "18k White Gold": "#E5E4E2",
  "18k Rose Gold": "#B76E79",
  "Platinum 950": "#A0B2C6",
};

export function MetalSelector({
  metals,
  selectedMetal,
  onSelect,
  className,
}: MetalSelectorProps) {
  const count = metals.length;
  // Dynamically assign CSS grid columns so tabs evenly divide and fill 100% of the container width (no empty space)
  const gridColsClass =
    count === 1
      ? "grid-cols-1"
      : count === 2
      ? "grid-cols-2"
      : count === 3
      ? "grid-cols-3"
      : count === 4
      ? "grid-cols-2 sm:grid-cols-4"
      : "grid-cols-2 sm:grid-cols-3";

  return (
    <div
      role="radiogroup"
      aria-label="Select alloy"
      className={cn(
        "grid gap-2 p-1.5 bg-background border border-border/50 w-full",
        gridColsClass,
        className
      )}
    >
      {metals.map((metal) => {
        const isSelected = selectedMetal === metal;

        return (
          <motion.button
            key={metal}
            type="button"
            role="radio"
            aria-checked={isSelected}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect(metal)}
            className={cn(
              "relative py-3 px-2 sm:px-3 text-center transition-colors flex items-center justify-center gap-2 overflow-hidden cursor-pointer w-full",
              isSelected
                ? "text-primary-foreground font-medium"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary/40"
            )}
          >
            {isSelected && (
              <motion.div
                layoutId="activeMetalPill"
                className="absolute inset-0 bg-primary border border-primary shadow-xs"
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
              />
            )}
            <span
              className={cn(
                "relative z-10 size-2 rounded-full shrink-0 shadow-xs transition-transform",
                isSelected
                  ? "border border-primary-foreground/40 scale-110"
                  : "border border-border"
              )}
              style={{ backgroundColor: METAL_COLORS[metal] || "#E5E4E2" }}
            />
            <span
              className={cn(
                "relative z-10 text-[11px] sm:text-xs uppercase tracking-wider sm:tracking-widest font-heading transition-colors truncate text-center block",
                isSelected
                  ? "text-primary-foreground font-medium"
                  : "text-foreground/80 hover:text-foreground"
              )}
            >
              {metal}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}
