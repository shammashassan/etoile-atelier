"use client";

import React, { Suspense, useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { Menu } from "lucide-react";
import { BRAND } from "@/lib/data";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";

interface SiteHeaderProps {
  announcementBar?: string;
  atelierName?: string;
}

interface NavItem {
  href: string;
  label: string;
  id: string;
  className?: string;
  match: (pathname: string | null) => boolean;
}

const NAV_LINKS: NavItem[] = [
  {
    href: "/collections",
    label: "Collections",
    id: "collections",
    match: (pathname) =>
      Boolean(pathname?.startsWith("/collections") || pathname?.startsWith("/products")),
  },
  {
    href: "/consultation",
    label: "Bespoke Salon",
    id: "consultation",
    match: (pathname) => Boolean(pathname?.startsWith("/consultation")),
  },
  {
    href: "/#studio",
    label: "Optical Studio",
    id: "studio",
    className: "hidden xl:inline-block",
    match: () => false,
  },
  {
    href: "/#vault",
    label: "Vendôme Vault",
    id: "vault",
    className: "hidden 2xl:inline-block",
    match: () => false,
  },
];

function NavLinks() {
  const pathname = usePathname();
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const activeItem = NAV_LINKS.find((item) => item.match(pathname));
  const activeId = activeItem?.id ?? null;
  const currentIndicatorId = hoveredId ?? activeId;

  // When the route changes (i.e. user clicked a link), clear hover so the
  // indicator snaps back to the newly active item instead of staying on
  // wherever the mouse happened to be during the click.
  useEffect(() => {
    setHoveredId(null);
  }, [pathname]);

  return (
    <nav
      onMouseLeave={() => setHoveredId(null)}
      className="flex items-center justify-start gap-6 lg:gap-8 xl:gap-10 text-sm lg:text-base text-muted-foreground whitespace-nowrap"
    >
      {NAV_LINKS.map((item) => {
        const isActive = activeId === item.id;
        const isTarget = currentIndicatorId === item.id;

        return (
          <Link
            key={item.id}
            href={item.href}
            prefetch={true}
            onMouseEnter={() => setHoveredId(item.id)}
            onFocus={() => setHoveredId(item.id)}
            onBlur={(e) => {
              if (!e.currentTarget.parentElement?.contains(e.relatedTarget as Node | null)) {
                setHoveredId(null);
              }
            }}
            className={cn(
              "relative inline-block py-1 tracking-wide transition-colors duration-200 outline-none",
              isActive ? "text-foreground font-medium" : "text-muted-foreground hover:text-foreground",
              item.className
            )}
          >
            <span>{item.label}</span>

            {/* Subtle ghost anchor: retains active indicator presence when hovering another salon */}
            {isActive && !isTarget && (
              <span
                aria-hidden="true"
                className="absolute left-0 right-0 -bottom-1 h-0.5 bg-primary/25 transition-opacity duration-300 pointer-events-none"
              />
            )}

            {/* Animated brown line indicator */}
            {isTarget && (
              <motion.span
                layoutId="headerNavIndicator"
                aria-hidden="true"
                className="absolute left-0 right-0 -bottom-1 h-0.5 bg-primary pointer-events-none"
                transition={{
                  type: "spring",
                  stiffness: 380,
                  damping: 30,
                  mass: 0.8,
                }}
              />
            )}
          </Link>
        );
      })}
    </nav>
  );
}

function NavLinksFallback() {
  return (
    <nav className="flex items-center justify-start gap-6 lg:gap-8 xl:gap-10 text-sm lg:text-base text-muted-foreground whitespace-nowrap">
      {NAV_LINKS.map((item) => (
        <Link
          key={item.id}
          href={item.href}
          prefetch={true}
          className={cn(
            "relative inline-block py-1 tracking-wide text-muted-foreground transition-colors hover:text-foreground",
            item.className
          )}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}

function HeaderAction() {
  const pathname = usePathname();
  const isConsultation = pathname?.startsWith("/consultation");

  if (isConsultation) {
    return (
      <Link
        href="/collections"
        prefetch={true}
        className="bg-primary text-primary-foreground px-4 lg:px-6 py-2.5 text-[13px] sm:text-sm lg:text-base font-medium whitespace-nowrap transition-transform duration-150 active:scale-[0.98] hover:bg-primary/90"
      >
        Salon Catalog
      </Link>
    );
  }

  return (
    <Link
      href="/consultation"
      prefetch={true}
      className="bg-primary text-primary-foreground px-4 lg:px-6 py-2.5 text-[13px] sm:text-sm lg:text-base font-medium whitespace-nowrap transition-transform duration-150 active:scale-[0.98] hover:bg-primary/90"
    >
      Book Private Viewing
    </Link>
  );
}

function HeaderActionFallback() {
  return (
    <Link
      href="/consultation"
      prefetch={true}
      className="bg-primary text-primary-foreground px-4 lg:px-6 py-2.5 text-[13px] sm:text-sm lg:text-base font-medium whitespace-nowrap transition-transform duration-150 active:scale-[0.98] hover:bg-primary/90"
    >
      Book Private Viewing
    </Link>
  );
}

function MobileAction() {
  const pathname = usePathname();
  const isConsultation = pathname?.startsWith("/consultation");

  if (isConsultation) {
    return (
      <Link
        href="/collections"
        prefetch={true}
        className="bg-primary text-primary-foreground px-3.5 py-2 text-[13px] font-medium whitespace-nowrap hover:bg-primary/90"
      >
        Catalog
      </Link>
    );
  }

  return (
    <Link
      href="/consultation"
      prefetch={true}
      className="bg-primary text-primary-foreground px-3.5 py-2 text-[13px] font-medium whitespace-nowrap hover:bg-primary/90"
    >
      Book Viewing
    </Link>
  );
}

function MobileNavDrawerLinks() {
  const pathname = usePathname();
  const isCollections = pathname?.startsWith("/collections") || pathname?.startsWith("/products");
  const isConsultation = pathname?.startsWith("/consultation");

  return (
    <div className="flex flex-col gap-6 text-lg">
      <SheetClose render={<Link href="/" prefetch={true} className="text-foreground hover:text-primary transition-colors" />}>
        Home Atelier
      </SheetClose>
      <SheetClose render={<Link href="/collections" prefetch={true} className={cn("transition-colors hover:text-primary", isCollections ? "text-foreground font-semibold" : "text-muted-foreground")} />}>
        Collections Catalog
      </SheetClose>
      <SheetClose render={<Link href="/consultation" prefetch={true} className={cn("transition-colors hover:text-primary", isConsultation ? "text-foreground font-semibold" : "text-muted-foreground")} />}>
        Bespoke Salon Consultation
      </SheetClose>
      <SheetClose render={<Link href="/#studio" className="text-muted-foreground hover:text-foreground transition-colors" />}>
        Optical Studio
      </SheetClose>
      <SheetClose render={<Link href="/#vault" className="text-muted-foreground hover:text-foreground transition-colors" />}>
        Vendôme Vault
      </SheetClose>
      <div className="border-t border-border pt-6 mt-4">
        <SheetClose render={<Link href="/admin/login" prefetch={true} className="text-sm text-muted-foreground hover:text-foreground block py-1" />}>
          Director Portal
        </SheetClose>
      </div>
    </div>
  );
}

export function SiteHeader({
  announcementBar = BRAND.announcement,
  atelierName = BRAND.name,
}: SiteHeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="w-full bg-background text-foreground">
      {/* Top Architectural Quiet Bar */}
      <div className="bg-secondary px-6 md:px-12 xl:px-16 py-2.5 text-[13px] sm:text-sm text-muted-foreground flex justify-between items-center tracking-wide">
        <span className="truncate pr-4">{announcementBar}</span>
        <div className="flex items-center gap-4 sm:gap-6 shrink-0">
          <span className="hidden md:inline">{BRAND.citiesSummary}</span>
          <span className="hidden md:inline opacity-30">/</span>
          <Link
            href="/admin/login"
            prefetch={true}
            className="text-muted-foreground hover:text-foreground transition-colors font-medium text-[13px] sm:text-sm"
          >
            Director Portal
          </Link>
        </div>
      </div>

      {/* Main Haute Joaillerie Header: Symmetrical 3-Column Architecture */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm px-6 md:px-12 xl:px-16 py-5 md:py-6">
        {/* Desktop & Tablet View: Strictly Symmetrical 3-Column Grid */}
        <div className="hidden md:grid grid-cols-[1fr_auto_1fr] items-center w-full gap-4">
          {/* Left Wing (1fr): Primary Salons */}
          <Suspense fallback={<NavLinksFallback />}>
            <NavLinks />
          </Suspense>

          {/* Center Column: Geometrically Centered Monumental Wordmark */}
          <Link
            href="/"
            prefetch={true}
            className="flex flex-col items-center justify-center text-center group px-4 lg:px-8 shrink-0"
          >
            <span className="font-heading text-xl sm:text-2xl lg:text-3xl font-normal tracking-wide text-foreground block transition-opacity group-hover:opacity-90 whitespace-nowrap">
              {atelierName}
            </span>
            <span className="text-[13px] tracking-widest uppercase text-muted-foreground block mt-0.5 whitespace-nowrap">
              {BRAND.subtitle}
            </span>
          </Link>

          {/* Right Wing (1fr): High-Value Action CTA */}
          <div className="flex items-center justify-end">
            <Suspense fallback={<HeaderActionFallback />}>
              <HeaderAction />
            </Suspense>
          </div>
        </div>

        {/* Mobile View: Balanced Minimal Bar with Drawer */}
        <div className="flex md:hidden items-center justify-between">
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger
              aria-label="Open Navigation Menu"
              className="p-2 -ml-2 text-foreground hover:text-primary transition-colors focus:outline-none"
            >
              <Menu className="size-6" />
            </SheetTrigger>
            <SheetContent side="left" className="w-[85vw] max-w-sm bg-background p-6">
              <SheetHeader className="p-0 mb-8 border-b border-border pb-4 text-left">
                <SheetTitle className="font-heading text-xl font-normal tracking-wide normal-case text-foreground">
                  {atelierName}
                </SheetTitle>
                <span className="text-[13px] uppercase tracking-widest text-muted-foreground">
                  {BRAND.headquarters.district} • {BRAND.headquarters.city}
                </span>
              </SheetHeader>
              <Suspense fallback={<div className="h-40 animate-pulse bg-muted/20" />}>
                <MobileNavDrawerLinks />
              </Suspense>
            </SheetContent>
          </Sheet>

          {/* Centered Wordmark on Mobile */}
          <Link href="/" prefetch={true} className="text-center px-2">
            <span className="font-heading text-lg sm:text-xl font-normal tracking-wide text-foreground block whitespace-nowrap">
              {atelierName}
            </span>
            <span className="text-[13px] tracking-widest uppercase text-muted-foreground block -mt-0.5 whitespace-nowrap">
              {BRAND.headquarters.district}
            </span>
          </Link>

          {/* Mobile Right CTA Button */}
          <Suspense fallback={<div className="w-16 h-8 bg-muted/30" />}>
            <MobileAction />
          </Suspense>
        </div>
      </header>
    </div>
  );
}
