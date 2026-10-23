import Link from "next/link";
import { Settings, Sparkles } from "lucide-react";
import { getSiteSettings } from "@/lib/queries/settings";
import { ConsultationClient } from "@/components/shared/ConsultationClient";
import { Button } from "@/components/ui/button";

export default async function ConsultationPage() {
  const settings = await getSiteSettings();

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      {/* Editorial Announcement Bar */}
      <div className="border-b border-border bg-muted/40 py-2.5 text-center text-xs tracking-widest uppercase text-muted-foreground px-4">
        {settings.announcementBar}
      </div>

      {/* Main Luxury Header */}
      <header className="sticky top-0 z-40 border-b border-border/80 bg-background/90 backdrop-blur-md">
        <div className="container mx-auto flex h-20 items-center justify-between px-6 lg:px-12">
          <nav className="hidden items-center gap-8 text-xs font-medium uppercase tracking-widest text-muted-foreground md:flex">
            <Link href="/" className="transition-colors hover:text-foreground">
              Home
            </Link>
            <Link href="/collections" className="transition-colors hover:text-foreground">
              Collections
            </Link>
            <Link href="/consultation" className="text-foreground transition-colors">
              Bespoke
            </Link>
            <Link href="/admin" className="transition-colors hover:text-foreground flex items-center gap-1.5 text-primary font-semibold">
              <Settings className="size-3.5" />
              Atelier CMS
            </Link>
          </nav>

          <Link href="/" className="flex flex-col items-center">
            <span className="font-heading text-2xl font-normal tracking-widest uppercase text-foreground">
              {settings.atelierName}
            </span>
            <span className="text-xs tracking-widest uppercase text-muted-foreground">
              {settings.tagline}
            </span>
          </Link>

          <div className="flex items-center gap-4">
            <div className="hidden sm:inline-flex">
              <Link href="/admin/login">
                <Button variant="ghost" size="sm">
                  Director Portal
                </Button>
              </Link>
            </div>
            <Link href="/collections">
              <Button size="sm">
                <Sparkles data-icon="inline-start" />
                View Collection
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Consultation Content */}
      <main className="flex-1 container mx-auto px-6 py-12 lg:px-12">
        <ConsultationClient />
      </main>

      {/* Luxury Footer */}
      <footer className="border-t border-border bg-background py-16 text-center text-xs tracking-wider uppercase text-muted-foreground">
        <div className="container mx-auto px-6 flex flex-col items-center gap-6">
          <span className="font-heading text-lg tracking-widest text-foreground">
            {settings.atelierName}
          </span>
          <p className="max-w-md text-xs leading-relaxed lowercase text-muted-foreground">
            {settings.locations.join(" • ")}
          </p>
          <div className="text-xs text-muted-foreground/60">
            © 2026 {settings.atelierName}. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
