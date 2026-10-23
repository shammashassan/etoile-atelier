"use client";

import React, { useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface CardTiltProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  maxTilt?: number;
  perspective?: number;
}

export function CardTilt({
  children,
  className,
  maxTilt = 7,
  perspective = 1000,
  ...props
}: CardTiltProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [styleProps, setStyleProps] = useState({
    rx: 0,
    ry: 0,
    gx: 50,
    gy: 50,
    isHover: false,
  });

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "touch" || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const px = (x / rect.width) * 2 - 1; // -1 to 1
    const py = (y / rect.height) * 2 - 1; // -1 to 1

    const ry = px * maxTilt;
    const rx = -py * maxTilt;

    const gx = (x / rect.width) * 100;
    const gy = (y / rect.height) * 100;

    setStyleProps({ rx, ry, gx, gy, isHover: true });
  };

  const handlePointerLeave = () => {
    setStyleProps((prev) => ({ ...prev, rx: 0, ry: 0, isHover: false }));
  };

  return (
    <div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={cn("group/tilt relative will-change-transform", className)}
      style={{ perspective: `${perspective}px` }}
      {...props}
    >
      <div
        className="relative size-full transition-transform duration-300 ease-out"
        style={{
          transform: `rotateX(${styleProps.rx}deg) rotateY(${styleProps.ry}deg)`,
          transformStyle: "preserve-3d",
        }}
      >
        {children}
        {/* Specular Glare Overlay */}
        <div
          className="pointer-events-none absolute inset-0 z-20 transition-opacity duration-300"
          style={{
            opacity: styleProps.isHover ? 0.25 : 0,
            background: `radial-gradient(circle 320px at ${styleProps.gx}% ${styleProps.gy}%, oklch(0.98 0.05 85 / 70%), transparent 70%)`,
          }}
        />
      </div>
    </div>
  );
}
