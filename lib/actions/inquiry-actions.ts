"use server";

import { ObjectId } from "mongodb";
import { updateTag } from "next/cache";
import { getInquiriesCollection } from "@/lib/db/collections";
import { InquirySchema, type Inquiry } from "@/lib/schemas/inquiry";

export type ActionResult<T = unknown> =
  | { success: true; data: T }
  | { success: false; error: string; fieldErrors?: Record<string, string[]> };

export async function submitInquiryAction(rawData: unknown): Promise<ActionResult<Inquiry>> {
  try {
    const parseResult = InquirySchema.omit({ _id: true, status: true, createdAt: true }).safeParse(rawData);
    if (!parseResult.success) {
      return {
        success: false,
        error: "Validation failed",
        fieldErrors: parseResult.error.flatten().fieldErrors,
      };
    }

    const inquiryData = {
      ...parseResult.data,
      status: "pending" as const,
      createdAt: new Date(),
    };

    const col = await getInquiriesCollection();
    const result = await col.insertOne(inquiryData);

    updateTag("inquiries");

    return {
      success: true,
      data: {
        ...inquiryData,
        _id: result.insertedId.toString(),
      },
    };
  } catch (error) {
    console.error("submitInquiryAction error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to submit inquiry",
    };
  }
}

export async function updateInquiryStatusAction(
  id: string,
  status: Inquiry["status"]
): Promise<ActionResult> {
  try {
    const col = await getInquiriesCollection();
    await col.updateOne(
      { _id: new ObjectId(id) as unknown as string },
      { $set: { status } }
    );

    updateTag("inquiries");
    return { success: true, data: { id, status } };
  } catch (error) {
    console.error("updateInquiryStatusAction error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to update status",
    };
  }
}

export async function deleteInquiryAction(id: string): Promise<ActionResult> {
  try {
    const col = await getInquiriesCollection();
    await col.deleteOne({
      _id: new ObjectId(id) as unknown as string,
    });

    updateTag("inquiries");
    return { success: true, data: { id } };
  } catch (error) {
    console.error("deleteInquiryAction error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to delete inquiry",
    };
  }
}
