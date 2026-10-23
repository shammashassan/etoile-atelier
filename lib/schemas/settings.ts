import { z } from "zod";

export const SiteSettingsSchema = z.object({
  _id: z.string().optional(),
  atelierName: z.string().min(1, "Atelier name is required"),
  tagline: z.string(),
  announcementBar: z.string(),
  contactEmail: z.string().email(),
  contactPhone: z.string(),
  currency: z.string(),
  locations: z.array(z.string()),
  updatedAt: z.date().optional(),
});

export type SiteSettings = z.infer<typeof SiteSettingsSchema>;
