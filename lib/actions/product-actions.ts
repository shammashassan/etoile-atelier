"use server";

import { ObjectId } from "mongodb";
import { updateTag } from "next/cache";
import { getProductsCollection } from "@/lib/db/collections";
import { ProductSchema, type Product } from "@/lib/schemas/product";

export type ActionResult<T = unknown> =
  | { success: true; data: T }
  | { success: false; error: string; fieldErrors?: Record<string, string[]> };

export async function createProductAction(rawData: unknown): Promise<ActionResult<Product>> {
  try {
    const parseResult = ProductSchema.safeParse(rawData);
    if (!parseResult.success) {
      return {
        success: false,
        error: "Validation failed",
        fieldErrors: parseResult.error.flatten().fieldErrors,
      };
    }

    const productData = {
      ...parseResult.data,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    delete (productData as { _id?: string })._id;

    const col = await getProductsCollection();
    const result = await col.insertOne(productData);

    updateTag("products");

    return {
      success: true,
      data: {
        ...productData,
        _id: result.insertedId.toString(),
      },
    };
  } catch (error) {
    console.error("createProductAction error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to create product",
    };
  }
}

export async function updateProductAction(
  id: string,
  rawData: unknown
): Promise<ActionResult> {
  try {
    const parseResult = ProductSchema.partial().safeParse(rawData);
    if (!parseResult.success) {
      return {
        success: false,
        error: "Validation failed",
        fieldErrors: parseResult.error.flatten().fieldErrors,
      };
    }

    const col = await getProductsCollection();
    const updateData = {
      ...parseResult.data,
      updatedAt: new Date(),
    };
    delete (updateData as { _id?: string })._id;

    await col.updateOne(
      { _id: new ObjectId(id) as unknown as string },
      { $set: updateData }
    );

    updateTag("products");
    return { success: true, data: { id } };
  } catch (error) {
    console.error("updateProductAction error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to update product",
    };
  }
}

export async function deleteProductAction(id: string): Promise<ActionResult> {
  try {
    const col = await getProductsCollection();
    await col.deleteOne({ _id: new ObjectId(id) as unknown as string });

    updateTag("products");
    return { success: true, data: { id } };
  } catch (error) {
    console.error("deleteProductAction error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to delete product",
    };
  }
}

export async function toggleFeaturedAction(
  id: string,
  featured: boolean
): Promise<ActionResult> {
  try {
    const col = await getProductsCollection();
    await col.updateOne(
      { _id: new ObjectId(id) as unknown as string },
      { $set: { featured, updatedAt: new Date() } }
    );

    updateTag("products");
    return { success: true, data: { id, featured } };
  } catch (error) {
    console.error("toggleFeaturedAction error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to toggle featured",
    };
  }
}
