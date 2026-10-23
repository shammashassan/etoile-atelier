import type { Metadata } from "next";
import { ProductFormClient } from "@/components/dashboard/ProductFormClient";

export const metadata: Metadata = {
  title: "New Creation",
};

export default function NewProductPage() {
  return <ProductFormClient />;
}
