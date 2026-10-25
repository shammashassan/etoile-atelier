import type { Metadata } from "next";
import { getSiteSettings } from "@/lib/queries/settings";
import { BRAND } from "@/lib/data";
import { SiteHeader } from "@/components/shared/SiteHeader";
import { SiteFooter } from "@/components/shared/SiteFooter";
import { ConsultationClient } from "@/components/shared/ConsultationClient";

export const metadata: Metadata = {
  title: BRAND.seo.consultationTitle,
  description: BRAND.consultationDescription,
  alternates: {
    canonical: "/consultation",
  },
};

export default async function ConsultationPage() {
  const settings = await getSiteSettings();

  return (
    <div className="flex min-h-svh flex-col text-foreground selection:bg-primary selection:text-primary-foreground">
      {/* Uniform Haute Joaillerie Header */}
      <SiteHeader
        announcementBar={settings.announcementBar}
        atelierName={settings.atelierName}
      />

      {/* Main Consultation Content */}
      <main className="flex-1 bg-background px-6 md:px-12 xl:px-16 py-12 lg:py-20">
        <ConsultationClient />
      </main>

      {/* Uniform Monumental Footer */}
      <SiteFooter atelierName={settings.atelierName} />
    </div>
  );
}
