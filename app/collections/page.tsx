import Link from "next/link";
import { getProducts } from "@/lib/queries/products";
import { getSiteSettings } from "@/lib/queries/settings";
import { CollectionsFilterClient } from "@/components/shared/CollectionsFilterClient";

export default async function CollectionsPage() {
  const [products, settings] = await Promise.all([
    getProducts(),
    getSiteSettings(),
  ]);

  return (
    <div className="flex min-h-svh flex-col bg-background text-foreground">
      {/* Top Quiet Bar */}
      <div className="bg-secondary px-6 py-2 text-xs text-muted-foreground flex justify-between items-center">
        <span>{settings.announcementBar}</span>
        <span className="hidden sm:inline">Paris • Geneva • London • New York</span>
      </div>

      {/* Main Luxury Header: Flat, Architectural */}
      <header className="sticky top-0 z-40 bg-background border-b border-border/60"> {/* taste-skill-ignore */}
        <div className="container mx-auto flex h-20 items-center justify-between px-6 lg:px-12">
          <nav className="flex items-center gap-8 text-xs tracking-wider text-muted-foreground">
            <Link href="/" className="transition-colors hover:text-foreground">
              Home
            </Link>
            <Link href="/collections" className="text-foreground transition-colors font-medium">
              Collections
            </Link>
            <Link href="/consultation" className="transition-colors hover:text-foreground">
              Bespoke Salon
            </Link>
          </nav>

          <Link href="/" className="text-center group">
            <span className="font-heading text-2xl font-normal tracking-widest uppercase text-foreground block">
              {settings.atelierName}
            </span>
            <span className="text-[10px] tracking-widest uppercase text-muted-foreground block -mt-0.5">
              Haute Joaillerie
            </span>
          </Link>

          <div className="flex items-center gap-6 text-xs">
            <Link
              href="/admin/login"
              className="hidden md:inline text-muted-foreground hover:text-foreground transition-colors"
            >
              Director Portal
            </Link>
            <Link
              href="/consultation"
              className="bg-foreground text-background px-4 py-2 text-xs font-medium transition-colors hover:bg-foreground/90"
            >
              Book Salon Viewing
            </Link>
          </div>
        </div>
      </header>

      {/* Main Collections Content */}
      <main className="flex-1 container mx-auto px-6 py-12 lg:px-12 lg:py-16">
        <CollectionsFilterClient initialProducts={products} />
      </main>

      {/* Luxury Footer */}
      <footer className="bg-secondary/80 px-6 py-16 lg:px-12 text-foreground">
        <div className="container mx-auto flex flex-col md:flex-row md:items-baseline justify-between gap-6">
          <div>
            <span className="font-heading text-2xl font-normal tracking-widest uppercase">
              {settings.atelierName}
            </span>
            <p className="text-xs text-muted-foreground mt-1">
              Place Vendôme • Geneva • London • New York
            </p>
          </div>
          <div className="flex gap-8 text-xs text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <Link href="/collections" className="hover:text-foreground transition-colors">
              Collections
            </Link>
            <Link href="/consultation" className="hover:text-foreground transition-colors">
              Bespoke Salon
            </Link>
            <Link href="/admin/login" className="hover:text-foreground transition-colors">
              Director Portal
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}