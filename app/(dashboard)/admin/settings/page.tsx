import type { Metadata } from "next";
import { getSiteSettings } from "@/lib/queries/settings";
import { SettingsClient } from "@/components/dashboard/SettingsClient";

export const metadata: Metadata = {
  title: "Atelier Settings",
};

export default async function AdminSettingsPage() {
  const settings = await getSiteSettings();
  return <SettingsClient initialSettings={settings} />;
}
