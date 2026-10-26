"use client";

import React, { useState, useEffect, useRef, Suspense, useSyncExternalStore } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "motion/react";
import { Sparkles, Compass, Eye, Phone, Calendar, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { BRAND } from "@/lib/data";

const emptySubscribe = () => () => {};

interface DockTab {
  id: "atelier" | "catalog" | "vault" | "concierge" | "book";
  label: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  href?: string;
  isModal?: boolean;
}

const DOCK_TABS: readonly DockTab[] = [
  { id: "atelier", label: "Atelier", icon: Sparkles, href: "/" },
  { id: "catalog", label: "Catalog", icon: Compass, href: "/collections" },
  { id: "vault", label: "Vault", icon: Eye, href: "/#vault" },
  { id: "concierge", label: "Concierge", icon: Phone, isModal: true },
  { id: "book", label: "Book", icon: Calendar, href: "/consultation" },
];

function MobileBottomDockInner() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("atelier");
  const [prevPathname, setPrevPathname] = useState(pathname);
  const [showQuickContact, setShowQuickContact] = useState(false);
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);

  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    if (pathname?.startsWith("/consultation")) {
      setActiveTab("book");
    } else if (pathname?.startsWith("/collections") || pathname?.startsWith("/products")) {
      setActiveTab("catalog");
    } else if (pathname === "/") {
      setActiveTab("atelier");
    }
  }

  // Intent lock ref to prevent handleScroll from overriding activeTab during programmatic scroll
  const isScrollingToTarget = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Cancel target lock on manual user interaction
  useEffect(() => {
    const handleManualScroll = () => {
      if (isScrollingToTarget.current) {
        isScrollingToTarget.current = false;
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
          scrollTimeoutRef.current = null;
        }
      }
    };

    window.addEventListener("wheel", handleManualScroll, { passive: true });
    window.addEventListener("touchmove", handleManualScroll, { passive: true });
    return () => {
      window.removeEventListener("wheel", handleManualScroll);
      window.removeEventListener("touchmove", handleManualScroll);
    };
  }, []);

  // Smoothly hide dock on sustained downward scroll, reveal on upward scroll or near top
  // Never hide dock while modal is open or while programmatically scrolling to a section
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (showQuickContact || isScrollingToTarget.current) {
      if (hidden) setHidden(false);
      return;
    }

    const prev = scrollY.getPrevious() ?? 0;
    const diff = latest - prev;

    if (latest < 80) {
      setHidden(false);
    } else if (diff > 20 && latest > 220) {
      setHidden(true);
      setShowQuickContact(false);
    } else if (diff < -14) {
      setHidden(false);
    }
  });

  // Track active navigation tab based on scroll position on the home page
  useEffect(() => {
    if (!mounted) return;

    // If locked into a user-selected scroll target, preserve it
    if (isScrollingToTarget.current) return;

    if (pathname === "/") {
      // Check if URL hash targets a section (e.g. /#vault)
      if (typeof window !== "undefined" && window.location.hash === "#vault") {
        isScrollingToTarget.current = true;
        if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
        scrollTimeoutRef.current = setTimeout(() => {
          setActiveTab("vault");
          isScrollingToTarget.current = false;
        }, 50);
        return;
      }

      const handleScroll = () => {
        // Guard against overriding during programmatic scroll
        if (isScrollingToTarget.current) return;

        const vault = document.getElementById("vault");
        const collections = document.getElementById("collections");

        const scrollPos = window.scrollY + window.innerHeight * 0.35;

        if (vault && scrollPos >= vault.offsetTop) {
          setActiveTab("vault");
        } else if (collections && scrollPos >= collections.offsetTop) {
          setActiveTab("catalog");
        } else {
          setActiveTab("atelier");
        }
      };

      window.addEventListener("scroll", handleScroll, { passive: true });
      handleScroll();
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [pathname, mounted]);

  // Escape key handler for concierge card
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShowQuickContact(false);
      }
    };
    if (showQuickContact) {
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [showQuickContact]);

  // Do not render dock on admin or dashboard routes
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const currentTab = showQuickContact ? "concierge" : activeTab;
  const activeIndex = DOCK_TABS.findIndex((tab) => tab.id === currentTab);
  const primarySalon = BRAND.salons[0];

  const handleTabClick = (
    tab: DockTab,
    e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>
  ) => {
    if (tab.isModal) {
      setShowQuickContact((prev) => !prev);
      return;
    }

    setShowQuickContact(false);

    if (tab.id === "atelier") {
      if (pathname === "/") {
        e.preventDefault();
        isScrollingToTarget.current = true;
        setActiveTab("atelier");
        window.scrollTo({ top: 0, behavior: "smooth" });

        if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
        scrollTimeoutRef.current = setTimeout(() => {
          isScrollingToTarget.current = false;
        }, 1200);
      }
    } else if (tab.id === "catalog") {
      if (pathname === "/collections") {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } else if (tab.id === "vault") {
      if (pathname === "/") {
        e.preventDefault();
        isScrollingToTarget.current = true;
        setActiveTab("vault");

        const el = document.getElementById("vault");
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }

        if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
        scrollTimeoutRef.current = setTimeout(() => {
          isScrollingToTarget.current = false;
        }, 1200);
      } else {
        // Setting target lock so after client navigation to /#vault it won't flicker to home
        isScrollingToTarget.current = true;
        setActiveTab("vault");
        if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
        scrollTimeoutRef.current = setTimeout(() => {
          isScrollingToTarget.current = false;
        }, 1500);
      }
    } else if (tab.id === "book") {
      if (pathname === "/consultation") {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  return (
    <>
      {/* Backdrop overlay for Quick Concierge Modal */}
      <AnimatePresence>
        {showQuickContact && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setShowQuickContact(false)}
            aria-hidden="true"
            className="md:hidden fixed inset-0 bg-black/40 backdrop-blur-xs z-40"
          />
        )}
      </AnimatePresence>

      {/* Quick Concierge Dispatch Modal Card */}
      <AnimatePresence>
        {showQuickContact && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden fixed bottom-22 inset-x-4 z-50 max-w-sm mx-auto bg-card/95 backdrop-blur-xl border border-border/90 p-5 shadow-2xl rounded-2xl"
          >
            <div className="flex items-center justify-between pb-3 border-b border-border/40">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-accent block font-medium">
                  Private Salon Dispatch
                </span>
                <h4 className="font-heading text-lg font-normal text-foreground mt-0.5">
                  Kerala &amp; Dubai Concierge
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setShowQuickContact(false)}
                className="size-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                aria-label="Close concierge card"
              >
                <X className="size-4" />
              </button>
            </div>

            <p className="text-xs text-muted-foreground my-3 leading-relaxed font-normal">
              Immediate bridal viewing booking, diamond sourcing, or bespoke trousseau appointments in Kochi, Kozhikode, Thrissur, and Dubai.
            </p>

            <div className="flex flex-col gap-2 pt-1">
              <a
                href={primarySalon.telHref}
                className="w-full bg-accent text-accent-foreground py-2.5 px-4 text-xs font-medium rounded-lg flex items-center justify-center gap-2 hover:bg-accent/90 active:opacity-90 transition-opacity shadow-xs"
              >
                <Phone className="size-3.5" />
                <span>Call Concierge ({primarySalon.phone})</span>
              </a>
              <Link
                href="/consultation"
                onClick={() => setShowQuickContact(false)}
                className="w-full bg-secondary text-foreground py-2.5 px-4 text-xs font-normal rounded-lg text-center hover:bg-secondary/80 transition-colors"
              >
                Open Salon Appointment Form
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Haute Joaillerie Mobile Dock Container (Clipped to prevent document scroll overflow) */}
      <div className="md:hidden fixed inset-x-0 bottom-0 z-40 pointer-events-none overflow-hidden pb-[max(1rem,env(safe-area-inset-bottom,16px))] px-3 sm:px-6">
        <motion.aside
          aria-label="Mobile Salon Navigation"
          variants={{
            visible: { y: 0, opacity: 1 },
            hidden: { y: 100, opacity: 0 },
          }}
          animate={hidden ? "hidden" : "visible"}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-sm mx-auto pointer-events-auto"
        >
          <nav className="relative bg-background/90 backdrop-blur-xl border border-border/80 shadow-[0_12px_40px_rgba(0,0,0,0.22)] rounded-full p-1.5 grid grid-cols-5 items-stretch w-full overflow-hidden">
          {/* Single persistent sliding background pill - zero flicker, hardware accelerated */}
          {activeIndex !== -1 && (
            <motion.div
              aria-hidden="true"
              className="absolute inset-y-1.5 bg-primary border border-primary rounded-full pointer-events-none shadow-xs"
              style={{
                left: "6px",
                width: "calc((100% - 12px) / 5)",
              }}
              animate={{
                x: `${activeIndex * 100}%`,
              }}
              transition={{
                type: "spring",
                stiffness: 440,
                damping: 36,
                mass: 0.8,
              }}
            />
          )}

          {/* 5 Distinct Navigation Destinations */}
          {DOCK_TABS.map((tab) => {
            const isActive = currentTab === tab.id;
            const Icon = tab.icon;

            const buttonClasses = cn(
              "relative z-10 flex flex-col items-center justify-center py-2 px-1 rounded-full text-[10px] sm:text-[11px] font-normal transition-colors select-none outline-none cursor-pointer",
              isActive
                ? "text-primary-foreground font-medium"
                : "text-muted-foreground hover:text-foreground"
            );

            if (tab.isModal) {
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={(e) => handleTabClick(tab, e)}
                  aria-expanded={showQuickContact}
                  aria-label="Place Vendôme Concierge Hotline"
                  className={buttonClasses}
                >
                  <Icon className="size-4 mb-0.5 shrink-0" strokeWidth={1.75} />
                  <span className="leading-none">{tab.label}</span>
                </button>
              );
            }

            return (
              <Link
                key={tab.id}
                href={tab.href!}
                onClick={(e) => handleTabClick(tab, e)}
                className={buttonClasses}
              >
                <Icon className="size-4 mb-0.5 shrink-0" strokeWidth={1.75} />
                <span className="leading-none">{tab.label}</span>
              </Link>
            );
          })}
        </nav>
      </motion.aside>
    </div>
  </>
  );
}

export function MobileBottomDock() {
  return (
    <Suspense fallback={null}>
      <MobileBottomDockInner />
    </Suspense>
  );
}
