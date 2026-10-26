"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight, ShieldCheck, Gem, Sparkles, RefreshCw } from "lucide-react";
import { CardTilt } from "@/components/shared/motion/CardTilt";
import { FacetGlint } from "@/components/shared/motion/FacetGlint";
import { ScrollParallax } from "@/components/shared/motion/ScrollParallax";
import { cn } from "@/lib/utils";

interface FullBleedHeritageSectionProps {
  className?: string;
}

export function FullBleedHeritageSection({ className }: FullBleedHeritageSectionProps) {
  return (
    <section
      className={cn(
        "relative w-full overflow-hidden bg-secondary/50 py-16 sm:py-24 lg:py-32 text-foreground border-y border-border/50",
        className
      )}
    >
      {/* Subtle Background Watermark Parallax */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden flex items-center justify-center opacity-[0.04] select-none" aria-hidden="true">
        <ScrollParallax offsetY={-60}>
          <div className="size-[600px] rounded-full border-[40px] border-accent/30 rotate-45" />
        </ScrollParallax>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-12 xl:px-16">
        <div className="grid gap-10 lg:gap-12 lg:grid-cols-12 items-center">
          {/* Left Column: Monumental Editorial Statement & Amara Promise */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 flex flex-col"
          >
            <h2 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-foreground leading-[1.08] max-w-2xl">
              The Amara Gold Promise: Purity in Every Sovereign
            </h2>

            <p className="mt-4 sm:mt-6 text-sm sm:text-base lg:text-lg text-muted-foreground max-w-xl font-light leading-relaxed">
              For over three decades, Amara Gold has been the trusted standard for Kerala bridal jewellery and certified diamonds. Every creation is sculpted from 22-karat gold with official BIS 916 government hallmarking, complete price transparency, and guaranteed lifetime maintenance across Kerala and Dubai.
            </p>

            {/* The 4 Core Amara Gold Guarantees */}
            <div className="grid sm:grid-cols-2 gap-5 sm:gap-6 mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-border/60">
              <div className="flex flex-col gap-1.5">
                <span className="font-heading text-base sm:text-lg font-normal text-foreground flex items-center gap-2">
                  <ShieldCheck className="size-4 text-accent shrink-0" />
                  100% BIS 916 Hallmarked
                </span>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Every gram of gold is tested and stamped with the government HUID laser hallmark for uncompromised purity.
                </p>
              </div>

              <div className="flex flex-col gap-1.5">
                <span className="font-heading text-base sm:text-lg font-normal text-foreground flex items-center gap-2">
                  <Gem className="size-4 text-accent shrink-0" />
                  Mine Certified Natural Diamonds
                </span>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Hand-selected natural diamonds graded under strict VVS clarity and D-F colorless parameters with IGI &amp; GIA dossiers.
                </p>
              </div>

              <div className="flex flex-col gap-1.5">
                <span className="font-heading text-base sm:text-lg font-normal text-foreground flex items-center gap-2">
                  <RefreshCw className="size-4 text-accent shrink-0" />
                  Zero Deduction Exchange
                </span>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Full prevailing gold rate given on 22k gold exchange across all Kerala and UAE showrooms without deductions.
                </p>
              </div>

              <div className="flex flex-col gap-1.5">
                <span className="font-heading text-base sm:text-lg font-normal text-foreground flex items-center gap-2">
                  <Sparkles className="size-4 text-accent shrink-0" />
                  Complete Price Transparency
                </span>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Detailed invoice disclosing exact net gold weight, stone weight, stone charges, and making charges.
                </p>
              </div>
            </div>

            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6 w-full">
              <Link
                href="/consultation"
                className="inline-flex items-center justify-center w-full sm:w-auto h-12 px-6 sm:px-8 text-xs font-mono tracking-widest uppercase bg-accent text-accent-foreground hover:bg-accent/90 transition-transform active:scale-98 shadow-sm text-center"
              >
                Book Bridal Viewing
              </Link>
              <Link
                href="/collections"
                className="inline-flex items-center justify-center sm:justify-start gap-1.5 text-sm font-medium text-foreground hover:text-accent underline underline-offset-8 transition-colors py-2 sm:py-0"
              >
                <span>View Complete 916 Catalog</span>
                <ArrowUpRight className="size-4" />
              </Link>
            </div>
          </motion.div>

          {/* Right Column: Featured Masterpiece Visual Frame with Scroll Parallax */}
          <div className="lg:col-span-5">
            <ScrollParallax offsetY={36}>
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              >
                <CardTilt maxTilt={5}>
                  <Link
                    href="/products/kasavu-filigree-diamond-kada"
                    className="block relative aspect-4/5 w-full overflow-hidden bg-card border border-border/70 group shadow-md"
                  >
                    <Image
                      src="https://res.cloudinary.com/dunh3j6yu/image/upload/v1792877319/etoile-atelier/aura-sculpted-diamond-cuff.jpg"
                      alt="Kasavu Filigree Diamond Kada in 22k Sovereign Gold"
                      fill
                      sizes="(max-width: 1024px) 100vw, 42vw"
                      className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                    />
                    <FacetGlint />

                    {/* Corner Specification Overlay */}
                    <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/85 via-black/50 to-transparent text-white">
                      <span className="text-xs font-mono uppercase tracking-widest text-primary block mb-1">
                        Signature Creation • Kasavu Kada
                      </span>
                      <span className="font-heading text-xl sm:text-2xl text-white font-normal block">
                        4.20ctw Diamonds in 22k Sovereign Gold
                      </span>
                      <span className="text-xs text-white/70 mt-1 block">
                        Sculpted by master goldsmiths in Thrissur • BIS 916 Hallmarked
                      </span>
                    </div>
                  </Link>
                </CardTilt>
              </motion.div>
            </ScrollParallax>
          </div>
        </div>
      </div>
    </section>
  );
}
