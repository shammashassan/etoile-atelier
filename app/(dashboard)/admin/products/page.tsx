import { Suspense } from "react";
import type { Metadata } from "next";
import { getProducts } from "@/lib/queries/products";
import { ProductsTableClient } from "@/components/dashboard/ProductsTableClient";
import { Skeleton } from "@/components/ui/skeleton";

export const metadata: Metadata = {
  title: "Collection Inventory",
};

export default async function AdminProductsPage() {
  const products = await getProducts();

  return (
    <Suspense fallback={<Skeleton className="h-96 w-full" />}>
      <ProductsTableClient initialProducts={products} />
    </Suspense>
  );
}
