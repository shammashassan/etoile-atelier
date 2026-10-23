"use server";

import { updateTag } from "next/cache";
import { getSettingsCollection } from "@/lib/db/collections";
import { SiteSettingsSchema, type SiteSettings } from "@/lib/schemas/settings";

export type ActionResult<T = unknown> =
  | { success: true; data: T }
  | { success: false; error: string; fieldErrors?: Record<string, string[]> };

export async function updateSettingsAction(rawData: unknown): Promise<ActionResult<SiteSettings>> {
  try {
    const parseResult = SiteSettingsSchema.partial().safeParse(rawData);
    if (!parseResult.success) {
      return {
        success: false,
        error: "Validation failed",
        fieldErrors: parseResult.error.flatten().fieldErrors,
      };
    }

    const col = await getSettingsCollection();
    const updateData = {
      ...parseResult.data,
      updatedAt: new Date(),
    };
    delete (updateData as { _id?: string })._id;

    await col.updateOne(
      {},
      { $set: updateData },
      { upsert: true }
    );

    updateTag("settings");
    return { success: true, data: updateData as SiteSettings };
  } catch (error) {
    console.error("updateSettingsAction error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to update settings",
    };
  }
}
