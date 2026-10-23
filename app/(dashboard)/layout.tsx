import React, { Suspense } from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { BRAND } from "@/lib/data";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard/Sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export const metadata: Metadata = {
  title: {
    default: BRAND.seo.adminTitle,
    template: "%s | Atelier Management",
  },
  description: BRAND.adminPortalDescription,
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div data-ui="admin-dashboard" className="flex min-h-svh w-full bg-background text-foreground font-sans">
        <Suspense fallback={<div className="w-64 h-full bg-sidebar border-r border-sidebar-border" />}>
          <DashboardSidebar />
        </Suspense>
        <SidebarInset className="flex flex-1 flex-col overflow-y-auto">
          {/* Header: h-16 border-b perfectly aligned with SidebarHeader */}
          <header className="flex h-16 shrink-0 items-center justify-between border-b border-border px-6 bg-background">
            <div className="flex items-center gap-3">
              <SidebarTrigger className="-ml-1" />
              <Separator
                orientation="vertical"
                className="data-vertical:h-4 data-vertical:self-center"
              />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden sm:block">
                    <BreadcrumbLink render={<Link href="/admin" />}>
                      Atelier Management
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden sm:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Production CMS</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>
          <main className="flex-1 p-6 md:p-8">
            <div className="mx-auto max-w-6xl">{children}</div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
