"use client";

import React, { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
} from "motion/react";
import { cn } from "@/lib/utils";

export type MarqueeVariant = "light" | "dark" | "gold";

interface LuxuryMarqueeProps {
  className?: string;
  speed?: number; // legacy speed prop (lower = faster)
  baseVelocity?: number; // base movement velocity in % per second (default ~2.4 for faster, lively pace)
  reverse?: boolean;
  variant?: MarqueeVariant;
  items?: string[];
}

const DEFAULT_MARQUEE_ITEMS = [
  "100% BIS 916 Sovereign Gold",
  "Amara Gold Certified VVS Natural Diamonds",
  "Hereditary Thrissur Master Goldsmiths",
  "Travancore Palakka & Nagapadam Collections",
  "Kerala Kasavu Openwork Filigree",
  "Zero Deduction Gold Exchange",
  "Salons: Kochi • Kozhikode • Thrissur • Dubai",
  "IGI & GIA Certified Natural Diamonds",
  "Guaranteed Buyback & Lifetime Maintenance",
  "Complete Price Transparency with HUID Hallmarking",
];

// Pure modulo wrap helper to keep infinite continuous ribbon without flicker
const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

export function LuxuryMarquee({
  className,
  speed = 18,
  baseVelocity,
  reverse = false,
  variant = "light",
  items = DEFAULT_MARQUEE_ITEMS,
}: LuxuryMarqueeProps) {
  const isDark = variant === "dark";
  const isGold = variant === "gold";

  // Calculate base movement rate: if baseVelocity is provided use it, otherwise derive from speed (e.g. 50 / 18 = 2.77% per sec)
  const calculatedBaseRate = baseVelocity ?? Math.max(1.8, 50 / speed);

  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 350,
  });

  // Map scroll velocity to dynamic acceleration multiplier
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 4.5], {
    clamp: false,
  });

  const directionFactor = useRef<number>(reverse ? 1 : -1);
  const [isHovered, setIsHovered] = useState(false);

  useAnimationFrame((_, delta) => {
    if (isHovered) return;

    // Safety clamp on delta in case of tab-switching lag
    const clampedDelta = Math.min(delta, 64);
    const baseStep = (calculatedBaseRate * clampedDelta) / 1000;
    let moveBy = directionFactor.current * baseStep;

    const currentVelocity = velocityFactor.get();

    // Dynamically accelerate when scrolling
    if (Math.abs(currentVelocity) > 0.1) {
      if (currentVelocity < -0.3) {
        directionFactor.current = reverse ? 1 : -1;
      } else if (currentVelocity > 0.3) {
        directionFactor.current = reverse ? -1 : 1;
      }

      const boost = Math.min(Math.abs(currentVelocity), 6);
      moveBy += directionFactor.current * baseStep * boost;
    }

    baseX.set(wrap(-50, 0, baseX.get() + moveBy));
  });

  const x = useTransform(baseX, (v) => `${v}%`);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "relative w-full overflow-hidden border-y select-none group transition-colors",
        // Light variant
        variant === "light" && "bg-card/80 border-border/60 text-foreground/85 py-3.5",
        // Inverted Black Luxury Noir variant (uses dark tokens)
        isDark && "dark bg-background border-border text-foreground/90 py-4",
        // Sovereign 22k Gold variant (warm glowing gold & bronze luster)
        isGold && "bg-gradient-to-r from-[#16120b] via-[#221b10] to-[#16120b] border-amber-500/30 text-amber-200/95 py-4 shadow-inner",
        className
      )}
      aria-hidden="true"
    >
      {/* Edge vignette gradients for seamless fading matching the background */}
      <div
        className={cn(
          "pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-20 md:w-36 bg-gradient-to-r",
          variant === "light" && "from-background to-transparent",
          isDark && "from-background to-transparent",
          isGold && "from-[#16120b] to-transparent"
        )}
      />
      <div
        className={cn(
          "pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-20 md:w-36 bg-gradient-to-l",
          variant === "light" && "from-background to-transparent",
          isDark && "from-background to-transparent",
          isGold && "from-[#16120b] to-transparent"
        )}
      />

      {/* Marquee track driven by scroll velocity and frame loop */}
      <motion.div
        style={{ x }}
        className="flex min-w-full shrink-0 items-center gap-10 sm:gap-12 whitespace-nowrap will-change-transform"
      >
        {/* Render 4 repeated sets to guarantee seamless infinite wrapping under all screen resolutions */}
        {[...items, ...items, ...items, ...items].map((item, idx) => (
          <div
            key={`${item}-${idx}`}
            className={cn(
              "flex items-center gap-4 text-xs sm:text-sm font-mono uppercase tracking-[0.22em] transition-colors",
              variant === "light" && "text-foreground/80 hover:text-foreground",
              isDark && "text-muted-foreground hover:text-foreground",
              isGold && "text-amber-200/90 hover:text-amber-100"
            )}
          >
            <span
              className={cn(
                "size-1.5 rotate-45 shrink-0 inline-block shadow-xs",
                variant === "light" && "bg-accent shadow-[0_0_4px_rgba(212,175,55,0.4)]",
                isDark && "bg-accent shadow-[0_0_6px_rgba(212,175,55,0.6)]",
                isGold && "bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.7)]"
              )}
            />
            <span className="font-medium">{item}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
