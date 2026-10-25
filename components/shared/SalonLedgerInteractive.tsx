"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { Phone, Clock, MapPin, ArrowRight, Shield } from "lucide-react";
import { BRAND } from "@/lib/data";
import { MagneticButton } from "@/components/shared/motion/MagneticButton";
import { cn } from "@/lib/utils";

interface SalonTime {
  timeStr: string;
  isOpen: boolean;
}

const TIMEZONES: Record<string, string> = {
  paris: "Europe/Paris",
  geneva: "Europe/Zurich",
  london: "Europe/London",
  "new-york": "America/New_York",
};

export function SalonLedgerInteractive() {
  const [activeCityId, setActiveCityId] = useState<string>("paris");
  const [times, setTimes] = useState<Record<string, SalonTime>>({});

  useEffect(() => {
    const updateTimes = () => {
      const now = new Date();
      const newTimes: Record<string, SalonTime> = {};

      Object.entries(TIMEZONES).forEach(([cityId, timeZone]) => {
        try {
          const formatter = new Intl.DateTimeFormat("en-US", {
            timeZone,
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          });
          const hourFormatter = new Intl.DateTimeFormat("en-US", {
            timeZone,
            hour: "numeric",
            hour12: false,
          });
          const timeStr = formatter.format(now);
          const currentHour = parseInt(hourFormatter.format(now), 10);
          const isOpen = currentHour >= 10 && currentHour < 19;

          newTimes[cityId] = { timeStr, isOpen };
        } catch {
          newTimes[cityId] = { timeStr: "14:00", isOpen: true };
        }
      });

      setTimes(newTimes);
    };

    updateTimes();
    const interval = setInterval(updateTimes, 30000);
    return () => clearInterval(interval);
  }, []);

  const activeSalon = BRAND.salons.find((s) => s.id === activeCityId) || BRAND.salons[0];

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* City Switcher Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-1.5 bg-background border border-border/50">
        {BRAND.salons.map((salon) => {
          const isSelected = salon.id === activeCityId;
          const cityTime = times[salon.id];

          return (
            <motion.button
              key={salon.id}
              type="button"
              whileTap={{ scale: 0.97 }}
              onClick={() => setActiveCityId(salon.id)}
              className={cn(
                "relative py-3 px-3 text-left transition-colors flex flex-col justify-between overflow-hidden",
                isSelected
                  ? "text-foreground font-medium"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {isSelected && (
                <motion.div
                  layoutId="activeSalonPill"
                  className="absolute inset-0 bg-secondary border border-primary/40 -z-0"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <div className="relative z-10">
                <span className="text-xs uppercase tracking-wider block font-heading text-foreground">
                  {salon.city}
                </span>
                <span className="text-[11px] font-mono text-muted-foreground block mt-0.5">
                  {cityTime ? `${cityTime.timeStr} Local` : "Salon Hub"}
                </span>
              </div>
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
                {times[activeSalon.id]?.isOpen ? "Private Appointments Available Today" : "Concierge Inquiries Active"}
              </span>
            </div>
            <h3 className="font-heading text-2xl sm:text-3xl font-normal text-foreground">
              {activeSalon.name}
            </h3>
            <p className="text-sm sm:text-base text-muted-foreground mt-1 flex items-center gap-1.5">
              <MapPin className="size-3.5 text-primary shrink-0" />
              <span>{activeSalon.address}</span>
            </p>
          </div>

          <div className="flex flex-col sm:items-end text-xs text-muted-foreground font-mono">
            <span className="flex items-center gap-1">
              <Clock className="size-3 text-primary" />
              {activeSalon.schedule}
            </span>
            <span className="mt-0.5">Place Vendôme Protocol</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
          <a
            href={activeSalon.telHref}
            className="inline-flex items-center gap-2 text-sm text-foreground hover:text-primary transition-colors py-1"
          >
            <Phone className="size-4 text-primary" />
            <span className="font-mono">{activeSalon.phone}</span>
            <span className="text-xs text-muted-foreground">({activeSalon.callCtaLabel})</span>
          </a>

          <Link href="/consultation" className="inline-block">
            <MagneticButton strength={0.25} className="py-2.5 px-5 text-sm">
              <span>{activeSalon.ctaLabel}</span>
            </MagneticButton>
          </Link>
        </div>
      </motion.div>

      {/* Trust & Vault Protocol Note */}
      <div className="flex items-center gap-2 text-xs text-muted-foreground px-2">
        <Shield className="size-3.5 text-primary shrink-0" />
        <span>Direct VIP armored courier service and GIA certified private viewing rooms in each salon location.</span>
      </div>
    </div>
  );
}
