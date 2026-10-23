import { cacheTag, cacheLife } from "next/cache";
import { getInquiriesCollection } from "@/lib/db/collections";
import { type Inquiry } from "@/lib/schemas/inquiry";

export async function getInquiries(): Promise<Inquiry[]> {
  "use cache";
  cacheTag("inquiries");
  cacheLife("minutes");

  try {
    const col = await getInquiriesCollection();
    const docs = await col.find({}).sort({ createdAt: -1 }).toArray();
    return docs.map((doc) => ({
      ...doc,
      _id: doc._id?.toString(),
    })) as Inquiry[];
  } catch (error) {
    console.warn("MongoDB fallback in getInquiries:", error);
    return [];
  }
}
