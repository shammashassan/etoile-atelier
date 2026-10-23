"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Gem,
  CalendarCheck,
  Settings,
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
import { NavUser } from "@/components/dashboard/NavUser";
import { EtoileMark } from "@/components/shared/Logo";
import { BRAND } from "@/lib/data";

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

  const defaultUser = {
    name: session?.user?.name || "Atelier Director",
    email: session?.user?.email || BRAND.contact.adminEmail,
    avatar: session?.user?.image || undefined,
  };

  return (
    <Sidebar collapsible="icon">
      {/* Sidebar Header: h-16 to align border-b perfectly with page header */}
      <SidebarHeader className="h-16 flex flex-row items-center justify-between border-b border-sidebar-border px-3 group-data-[collapsible=icon]:p-0 group-data-[collapsible=icon]:justify-center">
        <SidebarMenu className="w-full">
          <SidebarMenuItem className="flex justify-center">
            <SidebarMenuButton
              size="lg"
              render={<Link href="/admin" />}
              className="h-10 data-open:bg-sidebar-accent group-data-[collapsible=icon]:!size-8 group-data-[collapsible=icon]:!p-0 group-data-[collapsible=icon]:!justify-center group-data-[collapsible=icon]:mx-auto"
            >
              <div className="flex size-8 shrink-0 items-center justify-center border border-sidebar-border bg-sidebar-primary text-sidebar-primary-foreground">
                <EtoileMark size={18} showHalo={false} className="text-sidebar-primary-foreground" />
              </div>
              <div className="flex flex-col text-left group-data-[collapsible=icon]:hidden">
                <span className="font-heading text-sm font-normal tracking-widest uppercase text-sidebar-foreground">
                  {BRAND.name}
                </span>
                <span className="text-[10px] tracking-widest uppercase text-sidebar-foreground/70">
                  {BRAND.headquarters.district}
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

      <SidebarFooter className="border-t border-sidebar-border p-2">
        <NavUser user={defaultUser} onSignOut={handleSignOut} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
