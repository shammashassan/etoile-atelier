import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProductById } from "@/lib/queries/products";
import { ProductFormClient } from "@/components/dashboard/ProductFormClient";

interface EditProductPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: EditProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = await getProductById(id);
  return {
    title: product ? `Edit: ${product.title}` : "Edit Creation",
  };
}

export default async function EditProductPage({ params }: EditProductPageProps) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <ProductFormClient initialProduct={product} />
    </div>
  );
}
