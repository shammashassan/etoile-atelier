import { getSiteSettings } from "@/lib/queries/settings";
import { SettingsClient } from "@/components/dashboard/SettingsClient";

export default async function AdminSettingsPage() {
  const settings = await getSiteSettings();
  return <SettingsClient initialSettings={settings} />;
}
