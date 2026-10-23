import type { Metadata } from "next";
import { getInquiries } from "@/lib/queries/inquiries";
import { InquiriesClient } from "@/components/dashboard/InquiriesClient";

export const metadata: Metadata = {
  title: "Bespoke Inquiries",
};

export default async function AdminInquiriesPage() {
  const inquiries = await getInquiries();
  return <InquiriesClient initialInquiries={inquiries} />;
}
