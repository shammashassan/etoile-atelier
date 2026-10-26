"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { Phone, Clock, MapPin } from "lucide-react";
import { BRAND } from "@/lib/data";
import { MagneticButton } from "@/components/shared/motion/MagneticButton";
import { cn } from "@/lib/utils";

export function SalonLedgerInteractive() {
  const [activeCityId, setActiveCityId] = useState<string>("kochi");

  const activeSalon = BRAND.salons.find((s) => s.id === activeCityId) || BRAND.salons[0];

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* City Switcher Tabs (4 Salons) - Centered with Black Selected State */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-1.5 bg-background border border-border/50">
        {BRAND.salons.map((salon) => {
          const isSelected = salon.id === activeCityId;

          return (
            <motion.button
              key={salon.id}
              type="button"
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveCityId(salon.id)}
              className={cn(
                "relative py-3.5 px-3 text-center transition-colors flex items-center justify-center overflow-hidden cursor-pointer",
                isSelected
                  ? "text-primary-foreground font-medium"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/40"
              )}
            >
              {isSelected && (
                <motion.div
                  layoutId="activeSalonPill"
                  className="absolute inset-0 bg-primary border border-primary shadow-xs"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
              <span
                className={cn(
                  "relative z-10 text-xs sm:text-sm uppercase tracking-widest font-heading transition-colors text-center block",
                  isSelected ? "text-primary-foreground font-medium" : "text-foreground/80 hover:text-foreground"
                )}
              >
                {salon.city}
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* Active Salon Showcase Card */}
      <motion.div
        key={activeSalon.id}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="bg-secondary p-6 sm:p-8 flex flex-col gap-6 border border-border/40"
      >
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-border/30">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-mono uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                Showroom Open for Consultations
              </span>
            </div>
            <h3 className="font-heading text-2xl font-normal text-foreground">
              {activeSalon.name}
            </h3>
            <p className="text-sm text-muted-foreground mt-0.5">
              {activeSalon.district} • Dedicated Bridal Jewellery Concierge
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono px-3 py-1 bg-accent/15 border border-accent/40 text-accent-foreground shadow-xs">
              Private Salon Suite
            </span>
          </div>
        </div>

        {/* Salon Coordinates Matrix */}
        <div className="grid gap-4 sm:grid-cols-3 text-sm">
          <div className="flex items-start gap-3">
            <MapPin className="size-4 text-accent shrink-0 mt-0.5" />
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground block">
                Showroom Location
              </span>
              <span className="text-foreground leading-snug block mt-0.5">
                {activeSalon.address}
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Clock className="size-4 text-accent shrink-0 mt-0.5" />
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground block">
                Store Hours
              </span>
              <span className="text-foreground leading-snug block mt-0.5">
                {activeSalon.schedule}
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Phone className="size-4 text-accent shrink-0 mt-0.5" />
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground block">
                Direct Concierge
              </span>
              <a
                href={activeSalon.telHref}
                className="text-foreground hover:text-accent transition-colors leading-snug block mt-0.5 font-mono"
              >
                {activeSalon.phone}
              </a>
            </div>
          </div>
        </div>

        {/* Salon Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          <Link href="/consultation" className="w-full sm:w-auto">
            <MagneticButton strength={0.3} variant="accent" className="w-full sm:w-auto">
              <span>{activeSalon.ctaLabel}</span>
            </MagneticButton>
          </Link>
          <a
            href={activeSalon.telHref}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors border border-border/60 hover:border-border"
          >
            <Phone className="size-3.5" />
            <span>{activeSalon.callCtaLabel}</span>
          </a>
        </div>
      </motion.div>
    </div>
  );
}
