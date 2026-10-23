"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Gem,
  CalendarCheck,
  Settings,
  ExternalLink,
  LogOut,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarRail,
} from "@/components/ui/sidebar";

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
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border px-3 py-3">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              render={<Link href="/admin" />}
              className="gap-3 data-open:bg-sidebar-accent"
            >
              <div className="flex size-8 shrink-0 items-center justify-center border border-sidebar-border bg-sidebar-primary text-sidebar-primary-foreground font-serif text-sm font-semibold">
                É
              </div>
              <div className="flex flex-col text-left group-data-[collapsible=icon]:hidden">
                <span className="font-heading text-sm font-normal tracking-widest uppercase text-sidebar-foreground">
                  Étoile
                </span>
                <span className="text-xs tracking-widest uppercase text-sidebar-foreground/70">
                  Haute Joaillerie
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs uppercase tracking-widest text-sidebar-foreground/60">
            Management Portal
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {NAV_ITEMS.map((item) => {
                const isActive =
                  item.href === "/admin"
                    ? pathname === "/admin"
                    : pathname.startsWith(item.href);
                const Icon = item.icon;

                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      render={<Link href={item.href} />}
                      isActive={isActive}
                      tooltip={item.label}
                      className="gap-3 text-xs tracking-wider uppercase font-medium"
                    >
                      <Icon className="size-4 shrink-0" />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border p-3 space-y-2">
        {session?.user && (
          <div className="rounded border border-sidebar-border/80 bg-sidebar-accent/50 p-2.5 space-y-0.5 group-data-[collapsible=icon]:hidden">
            <span className="font-heading text-xs font-semibold text-sidebar-foreground block truncate">
              {session.user.name}
            </span>
            <span className="text-xs text-sidebar-foreground/70 block truncate font-mono">
              {session.user.email}
            </span>
          </div>
        )}

        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              render={<Link href="/" target="_blank" />}
              tooltip="View Public Storefront"
              className="text-xs uppercase tracking-wider text-sidebar-foreground/80 hover:text-sidebar-foreground"
            >
              <ExternalLink className="size-4 shrink-0" />
              <span>Public Storefront</span>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={handleSignOut}
              tooltip="Sign Out"
              className="text-xs uppercase tracking-wider text-destructive hover:bg-destructive/10 hover:text-destructive"
            >
              <LogOut className="size-4 shrink-0" />
              <span>Sign Out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
