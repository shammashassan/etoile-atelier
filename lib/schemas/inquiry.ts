import { z } from "zod";

export const INQUIRY_TYPES = [
  "Kerala Bridal Trousseau (20+ Pavans)",
  "Custom Solitaire Engagement Ring",
  "Heritage Antique & Temple Gold Commission",
  "Private Atelier Viewing Appointment",
  "Family Gold Remodeling & Exchange",
  "Anniversary Band & Diamond Jewelry",
] as const;

export const BUDGET_RANGES = [
  "₹1,00,000 – ₹3,00,000 (15–40g)",
  "₹3,00,000 – ₹7,00,000 (5–10 Pavans)",
  "₹7,00,000 – ₹15,00,000 (10–20 Pavans)",
  "₹15,00,000 – ₹35,00,000 (20–50 Pavans)",
  "₹35,00,000+ (Imperial Bridal Trousseau)",
] as const;

export const SHOWROOM_LOCATIONS = [
  "Kochi • Marine Drive Flagship",
  "Kozhikode • Mavoor Road Lounge",
  "Thrissur • Round West Sovereign Salon",
  "Dubai • DIFC Gate Precinct Suite",
  "Virtual WhatsApp Video Consultation",
] as const;

export const INQUIRY_STATUSES = [
  "pending",
  "contacted",
  "scheduled",
  "completed",
] as const;

export const InquirySchema = z.object({
  _id: z.string().optional(),
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(7, "Phone number is required"),
  preferredDate: z.string().min(1, "Preferred date is required"),
  jewelryType: z.enum(INQUIRY_TYPES),
  budgetRange: z.enum(BUDGET_RANGES),
  showroomLocation: z.string().optional().default("Kochi • Marine Drive Flagship"),
  notes: z.string().max(1000, "Notes cannot exceed 1000 characters").optional().default(""),
  status: z.enum(INQUIRY_STATUSES).default("pending"),
  createdAt: z.date().default(() => new Date()),
});

export type Inquiry = z.infer<typeof InquirySchema>;
