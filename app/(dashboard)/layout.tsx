import React from "react";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard/Sidebar";
import { Separator } from "@/components/ui/separator";

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
          <header className="flex h-16 shrink-0 items-center justify-between border-b border-border px-6 bg-background">
            <div className="flex items-center gap-3">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="h-4" />
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>Atelier Management System</span>
                <span>/</span>
                <span className="text-foreground font-medium">Production CMS</span>
              </div>
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
