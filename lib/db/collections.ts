import { type Collection } from "mongodb";
import { getDb } from "./index";
import { type Product } from "../schemas/product";
import { type Inquiry } from "../schemas/inquiry";
import { type SiteSettings } from "../schemas/settings";

export async function getProductsCollection(): Promise<Collection<Product>> {
  const db = await getDb();
  return db.collection<Product>("products");
}

export async function getInquiriesCollection(): Promise<Collection<Inquiry>> {
  const db = await getDb();
  return db.collection<Inquiry>("inquiries");
}

export async function getSettingsCollection(): Promise<Collection<SiteSettings>> {
  const db = await getDb();
  return db.collection<SiteSettings>("settings");
}
