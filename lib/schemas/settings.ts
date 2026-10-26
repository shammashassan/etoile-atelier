import { z } from "zod";

export const HeroSlideSchema = z.object({
  id: z.string(),
  image: z.string(),
  alt: z.string().optional(),
  title: z.string(),
  subtitle: z.string(),
  href: z.string(),
  actionText: z.string().optional(),
});

export type HeroSlide = z.infer<typeof HeroSlideSchema>;

export const SiteSettingsSchema = z.object({
  _id: z.string().optional(),
  atelierName: z.string().min(1, "Atelier name is required"),
  tagline: z.string(),
  announcementBar: z.string(),
  contactEmail: z.string().email(),
  contactPhone: z.string(),
  currency: z.string(),
  locations: z.array(z.string()),
  heroSlides: z.array(HeroSlideSchema).optional(),
  heroWorkbenchImage: z.string().optional(),
  heroWorkbenchAlt: z.string().optional(),
  heroWorkbenchTitle: z.string().optional(),
  heroWorkbenchSubtitle: z.string().optional(),
  updatedAt: z.date().optional(),
});

export type SiteSettings = z.infer<typeof SiteSettingsSchema>;
