import { z } from "zod";

export const METALS = [
  "18k Yellow Gold",
  "18k White Gold",
  "18k Rose Gold",
  "Platinum 950",
] as const;

export const GEMSTONES = [
  "Natural Diamond",
  "Lab-Grown Diamond",
  "Royal Blue Sapphire",
  "Colombian Emerald",
  "Burmese Ruby",
  "Tahitian South Sea Pearl",
  "None",
] as const;

export const CATEGORIES = [
  "Rings",
  "Necklaces",
  "Bracelets",
  "Earrings",
  "High Jewelry",
] as const;

export const STOCK_STATUSES = [
  "in_stock",
  "made_to_order",
  "sold_out",
] as const;

export const ProductImageSchema = z.object({
  url: z.string().url("Must be a valid image URL"),
  alt: z.string().min(1, "Alt text is required"),
  isPrimary: z.boolean(),
});

export const ProductSchema = z.object({
  _id: z.string().optional(),
  title: z.string().min(3, "Title must be at least 3 characters"),
  slug: z.string().min(3, "Slug is required").regex(/^[a-z0-9-]+$/, "Slug must be lowercase alphanumeric with hyphens"),
  sku: z.string().min(2, "SKU is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  shortDescription: z.string().min(5, "Short description is required"),
  price: z.number().positive("Price must be greater than 0"),
  compareAtPrice: z.number().positive().optional().nullable(),
  category: z.enum(CATEGORIES),
  collection: z.string().min(2, "Collection name is required"),
  metals: z.array(z.enum(METALS)).min(1, "Select at least one precious metal"),
  gemstones: z.array(z.enum(GEMSTONES)).min(1, "Select at least one gemstone or None"),
  caratWeight: z.number().positive().optional().nullable(),
  clarity: z.string().optional().nullable(),
  cutGrade: z.string().optional().nullable(),
  images: z.array(ProductImageSchema).min(1, "Provide at least one image"),
  stockStatus: z.enum(STOCK_STATUSES),
  stockQuantity: z.number().int().nonnegative(),
  featured: z.boolean(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type Product = z.infer<typeof ProductSchema>;
export type ProductImage = z.infer<typeof ProductImageSchema>;
