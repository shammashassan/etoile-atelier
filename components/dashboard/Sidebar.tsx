"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Gem,
  CalendarCheck,
  Settings,
  ExternalLink,
  LogOut,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";

const NAV_ITEMS = [
  { label: "Atelier Overview", href: "/admin", icon: LayoutDashboard },
  { label: "Jewelry Collection", href: "/admin/products", icon: Gem },
  { label: "Bespoke Inquiries", href: "/admin/inquiries", icon: CalendarCheck },
  { label: "Atelier Settings", href: "/admin/settings", icon: Settings },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = authClient.useSession();

  const handleSignOut = async () => {
    try {
      await authClient.signOut();
      router.push("/admin/login");
    } catch {
      router.push("/admin/login");
    }
  };

  return (
    <aside className="flex h-screen w-64 flex-col border-r border-border bg-card/60 backdrop-blur-md">
      {/* Brand Header */}
      <div className="flex h-20 items-center justify-between border-b border-border px-6">
        <Link href="/admin" className="flex flex-col">
          <span className="font-heading text-lg tracking-widest uppercase text-foreground">
            Étoile
          </span>
          <span className="text-xs tracking-widest uppercase text-muted-foreground">
            Atelier Portal
          </span>
        </Link>
        <Sparkles className="size-4 text-primary" />
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1.5 p-4">
        {NAV_ITEMS.map((item) => {
          const isActive =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3.5 py-2.5 text-xs font-medium uppercase tracking-wider transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground font-semibold"
                  : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
              )}
            >
              <Icon className="size-4 shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Storefront Link & Sign Out */}
      <div className="border-t border-border p-4 space-y-2">
        {session?.user && (
          <div className="rounded border border-border/80 bg-muted/40 p-2.5 space-y-0.5">
            <span className="font-heading text-xs font-semibold text-foreground block truncate">
              {session.user.name}
            </span>
            <span className="text-xs text-muted-foreground block truncate font-mono">
              {session.user.email}
            </span>
          </div>
        )}

        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between px-3.5 py-2 text-xs font-medium uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
        >
          <span>View Public Store</span>
          <ExternalLink className="size-3.5" />
        </Link>

        <div className="pt-2 border-t border-border/60">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleSignOut}
            className="w-full justify-start text-xs tracking-wider uppercase text-muted-foreground hover:text-destructive"
          >
            <LogOut data-icon="inline-start" />
            Sign Out
          </Button>
        </div>
      </div>
    </aside>
  );
}
