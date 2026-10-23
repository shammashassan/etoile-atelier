import { Suspense } from "react";
import { getProducts } from "@/lib/queries/products";
import { ProductsTableClient } from "@/components/dashboard/ProductsTableClient";
import { Skeleton } from "@/components/ui/skeleton";

export default async function AdminProductsPage() {
  const products = await getProducts();

  return (
    <Suspense fallback={<Skeleton className="h-96 w-full" />}>
      <ProductsTableClient initialProducts={products} />
    </Suspense>
  );
}
