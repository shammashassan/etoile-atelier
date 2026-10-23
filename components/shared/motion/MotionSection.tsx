"use client";

import React, { useRef } from "react";
import Image, { ImageProps } from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { cn } from "@/lib/utils";

interface MotionSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

/**
 * Standard luxury section entrance: elements rise 18px with opacity on scroll.
 */
export function MotionSection({ children, className = "", delay = 0 }: MotionSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Choreographed item entrance staggered within a section.
 */
export function MotionItem({ children, className = "", delay = 0 }: MotionSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-5%" }}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface MaskedLineHeadlineProps {
  lines: string[];
  className?: string;
  lineClassName?: string;
  tag?: "h1" | "h2" | "h3";
}

/**
 * Gallery Masked Line Reveal: Each line slides up from behind its baseline mask.
 * Caps at 2 lines per design-taste-frontend house rules.
 */
export function MaskedLineHeadline({
  lines,
  className = "",
  lineClassName = "",
  tag = "h1",
}: MaskedLineHeadlineProps) {
  const Tag = tag;
  return (
    <Tag className={cn("font-heading font-normal tracking-tight", className)}>
      {lines.map((line, idx) => (
        <span
          key={idx}
          className="block overflow-hidden pb-1 -mb-1"
        >
          <motion.span
            initial={{ y: "105%" }}
            animate={{ y: "0%" }}
            transition={{
              duration: 0.95,
              delay: idx * 0.12 + 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
            className={cn("block", lineClassName)}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

interface ShutterImageProps extends Omit<ImageProps, "className"> {
  containerClassName?: string;
  imageClassName?: string;
  aspectRatio?: string;
  delay?: number;
}

/**
 * Signature Move: Aperture Reveal
 * Smoothly resolves into view with quiet scale settling from 1.06 to 1.0.
 */
export function ShutterImage({
  containerClassName = "",
  imageClassName = "",
  aspectRatio = "aspect-3/4",
  delay = 0,
  alt,
  ...props
}: ShutterImageProps) {
  return (
    <div className={cn("relative w-full overflow-hidden bg-secondary", aspectRatio, containerClassName)}>
      <motion.div
        initial={{ opacity: 0, scale: 1.06 }}
        whileInView={{ opacity: 1, scale: 1.0 }}
        viewport={{ once: true, margin: "-5%" }}
        transition={{ duration: 1.0, delay, ease: [0.22, 1, 0.36, 1] }}
        className="w-full h-full relative"
      >
        <Image
          alt={alt}
          fill
          className={cn("object-cover transition-transform duration-700 ease-out hover:scale-105", imageClassName)}
          {...props}
        />
      </motion.div>
    </div>
  );
}

interface ScrollParallaxProps {
  children: React.ReactNode;
  className?: string;
  offsetY?: number;
}

/**
 * Controlled, subtle vertical drift on scroll (max 4-6%) for photographic elements.
 */
export function ScrollParallax({ children, className = "", offsetY = 24 }: ScrollParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-offsetY, offsetY]);

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <motion.div style={{ y }} className="w-full h-full">
        {children}
      </motion.div>
    </div>
  );
}
