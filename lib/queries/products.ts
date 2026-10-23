import { cacheTag, cacheLife } from "next/cache";
import { ObjectId } from "mongodb";
import { getProductsCollection } from "@/lib/db/collections";
import { INITIAL_PRODUCTS } from "@/lib/data";
import { type Product, METALS } from "@/lib/schemas/product";

export async function getProducts(filters?: {
  category?: string;
  metal?: string;
  stockStatus?: string;
  search?: string;
  sort?: "price-asc" | "price-desc" | "newest";
}): Promise<Product[]> {
  "use cache";
  cacheTag("products");
  cacheLife("hours");

  try {
    const col = await getProductsCollection();
    const query: Record<string, unknown> = {};

    if (filters?.category && filters.category !== "all") {
      query.category = filters.category;
    }
    if (filters?.metal && filters.metal !== "all") {
      query.metals = filters.metal;
    }
    if (filters?.stockStatus && filters.stockStatus !== "all") {
      query.stockStatus = filters.stockStatus;
    }
    if (filters?.search && filters.search.trim()) {
      query.title = { $regex: filters.search.trim(), $options: "i" };
    }

    let sortOption: Record<string, 1 | -1> = { createdAt: -1 };
    if (filters?.sort === "price-asc") {
      sortOption = { price: 1 };
    } else if (filters?.sort === "price-desc") {
      sortOption = { price: -1 };
    }

    const docs = await col.find(query).sort(sortOption).toArray();

    if (docs.length === 0 && !filters?.category && !filters?.stockStatus && !filters?.search && !filters?.metal) {
      return INITIAL_PRODUCTS;
    }

    return docs.map((doc) => ({
      ...doc,
      _id: doc._id?.toString(),
    })) as Product[];
  } catch (error) {
    console.warn("MongoDB unavailable or errored in getProducts, falling back to mock data:", error);
    let items = [...INITIAL_PRODUCTS];
    if (filters?.category && filters.category !== "all") {
      items = items.filter((p) => p.category.toLowerCase() === filters.category?.toLowerCase());
    }
    if (filters?.metal && filters.metal !== "all") {
      items = items.filter((p) => p.metals.includes(filters.metal as (typeof METALS)[number]));
    }
    if (filters?.stockStatus && filters.stockStatus !== "all") {
      items = items.filter((p) => p.stockStatus === filters.stockStatus);
    }
    if (filters?.search && filters.search.trim()) {
      const q = filters.search.toLowerCase();
      items = items.filter((p) => p.title.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q));
    }
    if (filters?.sort === "price-asc") {
      items.sort((a, b) => a.price - b.price);
    } else if (filters?.sort === "price-desc") {
      items.sort((a, b) => b.price - a.price);
    }
    return items;
  }
}

export async function getProductById(id: string): Promise<Product | null> {
  "use cache";
  cacheTag(`product-id-${id}`, "products");
  cacheLife("hours");

  try {
    const col = await getProductsCollection();
    let doc = null;
    if (ObjectId.isValid(id)) {
      doc = await col.findOne({ _id: new ObjectId(id) as unknown as string });
    }
    if (!doc) {
      return INITIAL_PRODUCTS.find((p) => p._id === id || p.slug === id) || null;
    }
    return {
      ...doc,
      _id: doc._id?.toString(),
    } as Product;
  } catch (error) {
    console.warn("MongoDB fallback in getProductById:", error);
    return INITIAL_PRODUCTS.find((p) => p._id === id || p.slug === id) || null;
  }
}

export async function getFeaturedProducts(): Promise<Product[]> {
  "use cache";
  cacheTag("products", "featured-products");
  cacheLife("hours");

  try {
    const col = await getProductsCollection();
    const docs = await col.find({ featured: true }).sort({ createdAt: -1 }).limit(6).toArray();
    if (docs.length === 0) {
      return INITIAL_PRODUCTS.filter((p) => p.featured);
    }
    return docs.map((doc) => ({
      ...doc,
      _id: doc._id?.toString(),
    })) as Product[];
  } catch (error) {
    console.warn("MongoDB fallback in getFeaturedProducts:", error);
    return INITIAL_PRODUCTS.filter((p) => p.featured);
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  "use cache";
  cacheTag(`product-${slug}`, "products");
  cacheLife("hours");

  try {
    const col = await getProductsCollection();
    const doc = await col.findOne({ slug });
    if (!doc) {
      return INITIAL_PRODUCTS.find((p) => p.slug === slug) || null;
    }
    return {
      ...doc,
      _id: doc._id?.toString(),
    } as Product;
  } catch (error) {
    console.warn("MongoDB fallback in getProductBySlug:", error);
    return INITIAL_PRODUCTS.find((p) => p.slug === slug) || null;
  }
}

export async function getInventoryStats() {
  "use cache";
  cacheTag("products", "inventory-stats");
  cacheLife("minutes");

  try {
    const col = await getProductsCollection();
    const all = await col.find({}).toArray();
    const items = all.length > 0 ? all : INITIAL_PRODUCTS;

    const totalPieces = items.length;
    const totalValue = items.reduce((sum, item) => sum + (item.price * (item.stockQuantity || 1)), 0);
    const inStockCount = items.filter((item) => item.stockStatus === "in_stock").length;
    const madeToOrderCount = items.filter((item) => item.stockStatus === "made_to_order").length;

    return {
      totalPieces,
      totalValue,
      inStockCount,
      madeToOrderCount,
    };
  } catch (error) {
    console.warn("MongoDB fallback in getInventoryStats:", error);
    const items = INITIAL_PRODUCTS;
    return {
      totalPieces: items.length,
      totalValue: items.reduce((sum, item) => sum + (item.price * (item.stockQuantity || 1)), 0),
      inStockCount: items.filter((item) => item.stockStatus === "in_stock").length,
      madeToOrderCount: items.filter((item) => item.stockStatus === "made_to_order").length,
    };
  }
}
