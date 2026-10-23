import { cacheTag, cacheLife } from "next/cache";
import { getSettingsCollection } from "@/lib/db/collections";
import { INITIAL_SETTINGS } from "@/lib/data";
import { type SiteSettings } from "@/lib/schemas/settings";

export async function getSiteSettings(): Promise<SiteSettings> {
  "use cache";
  cacheTag("settings");
  cacheLife("days");

  try {
    const col = await getSettingsCollection();
    const doc = await col.findOne({});
    if (!doc) {
      return INITIAL_SETTINGS;
    }
    return {
      ...doc,
      _id: doc._id?.toString(),
    } as SiteSettings;
  } catch (error) {
    console.warn("MongoDB fallback in getSiteSettings:", error);
    return INITIAL_SETTINGS;
  }
}
