import { z } from "zod";

export const INQUIRY_TYPES = [
  "Custom Solitaire Engagement Ring",
  "Bespoke High Jewelry Commission",
  "Private Atelier Viewing Appointment",
  "Heritage Gemstone Resetting",
  "Anniversary Band Design",
] as const;

export const BUDGET_RANGES = [
  "$2,500 – $5,000",
  "$5,000 – $15,000",
  "$15,000 – $35,000",
  "$35,000 – $75,000",
  "$75,000+",
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
  notes: z.string().max(1000, "Notes cannot exceed 1000 characters").optional().default(""),
  status: z.enum(INQUIRY_STATUSES).default("pending"),
  createdAt: z.date().default(() => new Date()),
});

export type Inquiry = z.infer<typeof InquirySchema>;
