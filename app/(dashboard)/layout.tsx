import React from "react";
import Link from "next/link";
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

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div data-ui="admin-dashboard" className="flex min-h-svh w-full bg-background text-foreground font-sans">
        <DashboardSidebar />
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
            <div className="flex items-center gap-4">
              <span className="inline-flex items-center gap-2 text-xs text-muted-foreground">
                <span className="size-2 rounded-full bg-foreground" />
                Live Database Connected
              </span>
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
