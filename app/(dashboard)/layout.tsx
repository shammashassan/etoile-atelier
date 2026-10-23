import React from "react";
import { DashboardSidebar } from "@/components/dashboard/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div data-ui="admin-dashboard" className="flex min-h-svh overflow-hidden bg-background text-foreground font-sans">
      <DashboardSidebar />
      <div className="flex flex-1 flex-col overflow-y-auto">
        <header className="flex h-16 shrink-0 items-center justify-between border-b border-border px-8 bg-background">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>Atelier Management System</span>
            <span>/</span>
            <span className="text-foreground font-medium">Production CMS</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-2 text-xs text-muted-foreground">
              <span className="size-2 rounded-full bg-foreground" />
              Live Database Connected
            </span>
          </div>
        </header>
        <main className="flex-1 p-8">
          <div className="mx-auto max-w-6xl">{children}</div>
        </main>
      </div>
    </div>
  );
}