"use client";

import React, { useState, Suspense } from "react";
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
  SheetDescription,
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
    href: "/#vault-carousel",
    label: "Archival Vault",
    id: "vault",
    className: "hidden xl:inline-block",
    match: () => false,
  },
  {
    href: "/#studio",
    label: "Optical Studio",
    id: "studio",
    className: "hidden 2xl:inline-block",
    match: () => false,
  },
  {
    href: "/about",
    label: "Our Heritage",
    id: "about",
    match: (pathname) => Boolean(pathname?.startsWith("/about")),
  },
];

function NavLinks() {
  const pathname = usePathname();
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [prevPathname, setPrevPathname] = useState(pathname);

  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setHoveredId(null);
  }

  const activeItem = NAV_LINKS.find((item) => item.match(pathname));
  const activeId = activeItem?.id ?? null;
  const currentIndicatorId = hoveredId ?? activeId;

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

            {/* Subtle ghost anchor */}
            {isActive && !isTarget && (
              <span
                aria-hidden="true"
                className="absolute left-0 right-0 -bottom-1 h-0.5 bg-accent/30 transition-opacity duration-300 pointer-events-none"
              />
            )}

            {/* Animated gold hairline indicator */}
            {isTarget && (
              <motion.span
                layoutId="headerNavIndicator"
                aria-hidden="true"
                className="absolute left-0 right-0 -bottom-1 h-0.5 bg-accent pointer-events-none"
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

function MobileAction() {
  const pathname = usePathname();
  const isConsultation = pathname?.startsWith("/consultation");

  if (isConsultation) {
    return (
      <Link
        href="/collections"
        prefetch={true}
        className="bg-primary text-primary-foreground px-3 sm:px-3.5 py-1.5 sm:py-2 text-xs sm:text-[13px] font-medium whitespace-nowrap hover:bg-primary/90 active:scale-95 transition-transform"
      >
        Catalog
      </Link>
    );
  }

  return (
    <Link
      href="/consultation"
      prefetch={true}
      className="bg-primary text-primary-foreground px-3 sm:px-3.5 py-1.5 sm:py-2 text-xs sm:text-[13px] font-medium whitespace-nowrap hover:bg-primary/90 active:scale-95 transition-transform shadow-xs"
    >
      Book Viewing
    </Link>
  );
}

function MobileNavDrawerLinks({ onClose }: { onClose: () => void }) {
  const pathname = usePathname();
  const isCollections = pathname?.startsWith("/collections") || pathname?.startsWith("/products");
  const isConsultation = pathname?.startsWith("/consultation");

  const handleAnchorClick = (id: string, e: React.MouseEvent) => {
    onClose();
    if (pathname === "/") {
      e.preventDefault();
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <nav className="flex flex-col gap-5 text-base">
      <Link
        href="/"
        prefetch={true}
        onClick={onClose}
        className={cn(
          "transition-colors py-1.5",
          pathname === "/" ? "font-medium text-foreground" : "text-muted-foreground hover:text-foreground"
        )}
      >
        Atelier Entrance
      </Link>

      <Link
        href="/collections"
        prefetch={true}
        onClick={onClose}
        className={cn(
          "transition-colors py-1.5",
          isCollections ? "font-medium text-foreground" : "text-muted-foreground hover:text-foreground"
        )}
      >
        Amara Gold Haute Collections
      </Link>

      <Link
        href="/about"
        prefetch={true}
        onClick={onClose}
        className={cn(
          "transition-colors py-1.5",
          pathname === "/about" ? "font-medium text-foreground" : "text-muted-foreground hover:text-foreground"
        )}
      >
        Our Heritage &amp; Thrissur Lineage
      </Link>

      <Link
        href="/#vault-carousel"
        onClick={(e) => handleAnchorClick("vault-carousel", e)}
        className="text-muted-foreground hover:text-foreground transition-colors py-1.5"
      >
        Archival Gold &amp; Diamond Vault
      </Link>

      <Link
        href="/#studio"
        onClick={(e) => handleAnchorClick("studio", e)}
        className="text-muted-foreground hover:text-foreground transition-colors py-1.5"
      >
        Optical &amp; Metallurgy Studio
      </Link>

      <div className="border-t border-border pt-6 mt-4 flex flex-col gap-4">
        <div className="text-xs text-muted-foreground">
          <span className="font-mono block uppercase tracking-widest text-[11px] mb-1.5">
            Kerala &amp; Dubai Concierge
          </span>
          <a
            href="tel:+914842389000"
            className="text-foreground hover:text-primary transition-colors font-mono font-medium block text-sm"
          >
            +91 484 238 9000
          </a>
        </div>
        <Link
          href="/admin/login"
          prefetch={true}
          onClick={onClose}
          className="text-sm text-muted-foreground hover:text-foreground block py-1.5 pt-3 border-t border-border/50"
        >
          Director Portal
        </Link>
      </div>
    </nav>
  );
}

export function SiteHeader({
  announcementBar = BRAND.announcement,
  atelierName = BRAND.name,
}: SiteHeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="w-full bg-background text-foreground">
      {/* Top Architectural Noir Quiet Bar */}
      <div className="dark bg-background border-b border-border/80 px-4 sm:px-6 md:px-12 xl:px-16 py-2.5 text-[12px] sm:text-[13px] text-muted-foreground flex justify-between items-center tracking-wide">
        <span className="truncate pr-4 text-foreground/90">{announcementBar}</span>
        <div className="flex items-center gap-4 sm:gap-6 shrink-0">
          <span className="hidden md:inline text-muted-foreground">{BRAND.citiesSummary}</span>
          <span className="hidden md:inline text-border">/</span>
          <Link
            href="/admin/login"
            prefetch={true}
            className="text-muted-foreground hover:text-foreground transition-colors font-medium text-[12px] sm:text-[13px]"
          >
            Director Portal
          </Link>
        </div>
      </div>

      {/* Main Haute Joaillerie Header: Symmetrical 3-Column Architecture */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm px-4 sm:px-6 md:px-12 xl:px-16 py-4 md:py-6">
        {/* Desktop & Tablet View: Strictly Symmetrical 3-Column Grid */}
        <div className="hidden md:grid grid-cols-[1fr_auto_1fr] items-center w-full gap-4">
          {/* Left Wing (1fr): Primary Salons */}
          <Suspense fallback={<nav className="flex items-center gap-6 text-sm text-muted-foreground invisible" />}>
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
            <Suspense fallback={null}>
              <HeaderAction />
            </Suspense>
          </div>
        </div>

        {/* Mobile View: Balanced Minimal Bar with Sheet Drawer */}
        <div className="flex md:hidden items-center justify-between gap-2 w-full">
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger
              aria-label="Open Navigation Menu"
              className="p-2 -ml-2 text-foreground hover:text-primary transition-colors focus:outline-none cursor-pointer shrink-0"
            >
              <Menu className="size-6" />
            </SheetTrigger>
            <SheetContent side="left" className="w-[85vw] max-w-sm bg-background p-6">
              <SheetHeader className="p-0 mb-6 border-b border-border pb-4 text-left">
                <SheetTitle className="font-heading text-xl font-normal tracking-wide normal-case text-foreground">
                  {atelierName}
                </SheetTitle>
                <SheetDescription className="text-[13px] uppercase tracking-widest text-muted-foreground mt-0.5">
                  {BRAND.headquarters.district} • {BRAND.headquarters.city}
                </SheetDescription>
              </SheetHeader>
              <Suspense fallback={null}>
                <MobileNavDrawerLinks onClose={() => setMobileOpen(false)} />
              </Suspense>
            </SheetContent>
          </Sheet>

          {/* Centered Wordmark on Mobile (with min-w-0 and max-w to prevent button squeezing) */}
          <Link href="/" prefetch={true} className="text-center px-1 min-w-0 max-w-[190px] sm:max-w-none truncate">
            <span className="font-heading text-base sm:text-xl font-normal tracking-wide text-foreground block truncate">
              {atelierName}
            </span>
            <span className="text-[11px] sm:text-xs tracking-widest uppercase text-muted-foreground block -mt-0.5 truncate">
              {BRAND.headquarters.district}
            </span>
          </Link>

          {/* Mobile Right CTA Button with guaranteed spacing */}
          <div className="shrink-0 flex items-center justify-end pl-1">
            <Suspense fallback={null}>
              <MobileAction />
            </Suspense>
          </div>
        </div>
      </header>
    </div>
  );
}
