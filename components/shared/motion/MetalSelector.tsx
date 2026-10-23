"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface MetalSelectorProps {
  metals: string[];
  selectedMetal: string;
  onSelect: (metal: string) => void;
  className?: string;
}

const METAL_COLORS: Record<string, string> = {
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
  return (
    <ToggleGroup
      value={[selectedMetal]}
      onValueChange={(vals) => {
        if (vals[0]) onSelect(vals[0]);
      }}
      className={cn("inline-flex flex-wrap gap-2 p-1 border border-border bg-muted/30", className)}
    >
      {metals.map((metal) => {
        const isSelected = selectedMetal === metal;
        return (
          <ToggleGroupItem
            key={metal}
            value={metal}
            variant="outline"
            className={cn(
              "relative z-10 flex items-center gap-2 px-3 py-1.5 text-xs font-medium tracking-wider uppercase transition-colors h-auto border-transparent",
              isSelected ? "text-foreground font-semibold" : "text-muted-foreground hover:text-foreground"
            )}
          >
            <span
              className="size-2 rounded-full border border-border shadow-xs shrink-0"
              style={{ backgroundColor: METAL_COLORS[metal] || "#E5E4E2" }}
            />
            {metal}
            {isSelected && (
              <motion.div
                layoutId="metalPillIndicator"
                className="absolute inset-0 -z-10 border border-border bg-background shadow-xs"
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
              />
            )}
          </ToggleGroupItem>
        );
      })}
    </ToggleGroup>
  );
}
