"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, Eye, Sparkles, ShieldCheck, ArrowUpRight } from "lucide-react";
import { type Product } from "@/lib/schemas/product";
import { formatPrice } from "@/lib/utils";
import { CardTilt } from "@/components/shared/motion/CardTilt";
import { FacetGlint } from "@/components/shared/motion/FacetGlint";
import { cn } from "@/lib/utils";

interface ImperialVaultCarouselProps {
  products: Product[];
  className?: string;
}

export function ImperialVaultCarousel({ products, className }: ImperialVaultCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const displayProducts = products.length > 0 ? products : [];
  const totalSlides = displayProducts.length;

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  // Keyboard navigation when focused
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlePrev, handleNext]);

  if (totalSlides === 0) return null;

  const currentItem = displayProducts[currentIndex];

  return (
    <div className={cn("flex flex-col gap-8 w-full", className)} id="vault-carousel">
      {/* ── Carousel Header & Controls ── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border/50 pb-6">
        <div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-foreground">
            Amara Gold High Jewellery Showcase
          </h2>
          <p className="mt-2 text-base text-muted-foreground max-w-xl leading-relaxed">
            Hereditary Kasavu filigree, Travancore emerald Palakka, and Amara Gold VVS solitaires forged in solid 22k sovereign gold and Platinum 950.
          </p>
        </div>

        {/* Carousel Prev/Next Buttons + Slide Counter */}
        <div className="flex items-center gap-4 shrink-0">
          <div className="text-sm font-mono text-muted-foreground tracking-widest">
            <span className="font-semibold text-foreground text-base">
              {String(currentIndex + 1).padStart(2, "0")}
            </span>{" "}
            / {String(totalSlides).padStart(2, "0")}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous masterpiece"
              className="size-11 rounded-full border border-border/70 bg-card hover:bg-secondary flex items-center justify-center text-foreground transition-all hover:scale-105 active:scale-95 shadow-xs"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next masterpiece"
              className="size-11 rounded-full border border-border/70 bg-card hover:bg-secondary flex items-center justify-center text-foreground transition-all hover:scale-105 active:scale-95 shadow-xs"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>
        </div>
      </div>

      {/* ── Featured Active Carousel Stage ── */}
      <div className="relative w-full overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentItem.slug}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="grid gap-8 lg:grid-cols-12 items-center bg-card border border-border/60 p-6 md:p-10 lg:p-12 shadow-sm"
          >
            {/* Left: Image Showcase with CardTilt & FacetGlint */}
            <div className="lg:col-span-7 relative">
              <CardTilt maxTilt={5}>
                <Link
                  href={`/products/${currentItem.slug}`}
                  className="block relative aspect-16/10 sm:aspect-16/9 w-full overflow-hidden bg-secondary group/image"
                >
                  {currentItem.images[0] && (
                    <Image
                      src={currentItem.images[0].url}
                      alt={currentItem.title}
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 55vw"
                      className="object-cover transition-transform duration-1000 ease-out group-hover/image:scale-105"
                    />
                  )}
                  <FacetGlint />

                  {/* Inspection Floating Badge */}
                  <div className="pointer-events-none absolute bottom-4 left-4 z-30 opacity-0 translate-y-2 transition-all duration-300 ease-out group-hover/image:opacity-100 group-hover/image:translate-y-0">
                    <span className="inline-flex items-center gap-1.5 bg-background/95 backdrop-blur-md px-3.5 py-1.5 text-xs font-mono text-foreground border border-border/60 shadow-xl">
                      <Eye className="size-3.5 text-primary" />
                      <span>Inspect Gemological Dossier ↗</span>
                    </span>
                  </div>
                </Link>
              </CardTilt>
            </div>

            {/* Right: Rich Indian Haute Joaillerie Specifications */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-6">
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-mono uppercase tracking-[0.25em] text-accent font-medium">
                    {currentItem.collection} Series • Ref {currentItem.sku}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs font-mono text-accent-foreground border border-accent/40 px-2 py-0.5 bg-accent/15">
                    <ShieldCheck className="size-3 text-accent" />
                    BIS 916 &amp; GIA
                  </span>
                </div>

                <Link
                  href={`/products/${currentItem.slug}`}
                  className="font-heading text-2xl sm:text-3xl lg:text-4xl font-normal text-foreground hover:text-primary transition-colors flex items-center gap-2 group/title"
                >
                  <span>{currentItem.title}</span>
                  <ArrowUpRight className="size-5 opacity-0 group-hover/title:opacity-100 transition-opacity" />
                </Link>

                <p className="text-base text-muted-foreground leading-relaxed">
                  {currentItem.description}
                </p>

                {/* Specs Pill Matrix */}
                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-border/40 text-sm">
                  <div className="flex flex-col">
                    <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                      Precious Metal
                    </span>
                    <span className="font-medium text-foreground">
                      {currentItem.metals[0]}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                      Gemstone Sourcing
                    </span>
                    <span className="font-medium text-foreground">
                      {currentItem.gemstones[0]} {currentItem.caratWeight ? `(${currentItem.caratWeight} ct)` : ""}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                      Clarity / Cut
                    </span>
                    <span className="font-medium text-foreground">
                      {currentItem.clarity || "Natural Untreated"} • {currentItem.cutGrade || "Master Cut"}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                      Availability
                    </span>
                    <span className="font-medium text-primary capitalize">
                      {currentItem.stockStatus.replace("_", " ")}
                    </span>
                  </div>
                </div>
              </div>

              {/* Price & Immediate Acquisition CTA */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-border/50">
                <div>
                  <span className="font-heading text-2xl sm:text-3xl font-light text-foreground block">
                    {formatPrice(currentItem.price, "INR")}
                  </span>
                  <span className="text-xs font-mono text-muted-foreground">
                    Inclusive of insured armored delivery
                  </span>
                </div>

                <Link
                  href={`/products/${currentItem.slug}`}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-accent text-accent-foreground text-sm font-medium hover:bg-accent/90 transition-colors shadow-xs"
                >
                  <span>Acquire Masterwork</span>
                  <ArrowUpRight className="size-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Slide Thumbnails Rail ── */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
        {displayProducts.map((prod, idx) => {
          const isActive = idx === currentIndex;
          return (
            <button
              key={prod.slug}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              className={cn(
                "group relative aspect-4/3 overflow-hidden border transition-all text-left p-1 bg-card",
                isActive
                  ? "border-accent ring-1 ring-accent/50 shadow-sm"
                  : "border-border/60 hover:border-border opacity-70 hover:opacity-100"
              )}
            >
              <div className="relative size-full overflow-hidden bg-secondary">
                {prod.images[0] && (
                  <Image
                    src={prod.images[0].url}
                    alt={prod.title}
                    fill
                    sizes="(max-width: 640px) 33vw, 16vw"
                    className="object-cover"
                  />
                )}
                {/* Active Gold Indicator Tab */}
                {isActive && (
                  <div className="absolute top-1 right-1 size-2 rounded-full bg-accent" />
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
