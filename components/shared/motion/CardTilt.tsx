"use client";

import React, { useRef, useState, useCallback } from "react";
import { motion, type HTMLMotionProps } from "motion/react";
import { cn } from "@/lib/utils";

interface CardTiltProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children: React.ReactNode;
  maxTilt?: number;
  perspective?: number;
  enableTouchTilt?: boolean;
}

export function CardTilt({
  children,
  className,
  maxTilt = 6,
  perspective = 1000,
  enableTouchTilt = true,
  ...props
}: CardTiltProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [styleProps, setStyleProps] = useState({
    rx: 0,
    ry: 0,
    gx: 50,
    gy: 50,
    isActive: false,
  });

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      if (e.pointerType === "touch" && !enableTouchTilt) return;

      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Normalize -1 to 1
      const px = Math.max(-1, Math.min(1, (x / rect.width) * 2 - 1));
      const py = Math.max(-1, Math.min(1, (y / rect.height) * 2 - 1));

      // Touch gets a gentler, buttery tilt
      const factor = e.pointerType === "touch" ? 0.65 : 1;
      const ry = px * maxTilt * factor;
      const rx = -py * maxTilt * factor;

      const gx = Math.max(0, Math.min(100, (x / rect.width) * 100));
      const gy = Math.max(0, Math.min(100, (y / rect.height) * 100));

      setStyleProps({ rx, ry, gx, gy, isActive: true });
    },
    [enableTouchTilt, maxTilt]
  );

  const resetTilt = useCallback(() => {
    setStyleProps((prev) => ({ ...prev, rx: 0, ry: 0, isActive: false }));
  }, []);

  return (
    <motion.div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetTilt}
      onPointerUp={resetTilt}
      onPointerCancel={resetTilt}
      whileTap={{ scale: 0.985 }}
      transition={{ type: "spring", stiffness: 400, damping: 28 }}
      className={cn("group/tilt relative will-change-transform touch-pan-y", className)}
      style={{ perspective: `${perspective}px` }}
      {...props}
    >
      <div
        className="relative size-full transition-transform duration-250 ease-out"
        style={{
          transform: `rotateX(${styleProps.rx}deg) rotateY(${styleProps.ry}deg)`,
          transformStyle: "preserve-3d",
        }}
      >
        {children}
        {/* Specular Gemstone Glare Overlay */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-20 transition-opacity duration-300"
          style={{
            opacity: styleProps.isActive ? 0.22 : 0,
            background: `radial-gradient(circle 280px at ${styleProps.gx}% ${styleProps.gy}%, oklch(0.98 0.04 85 / 75%), transparent 70%)`,
          }}
        />
      </div>
    </motion.div>
  );
}
