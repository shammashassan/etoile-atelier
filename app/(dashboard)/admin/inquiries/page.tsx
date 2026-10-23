import { getInquiries } from "@/lib/queries/inquiries";
import { InquiriesClient } from "@/components/dashboard/InquiriesClient";

export default async function AdminInquiriesPage() {
  const inquiries = await getInquiries();
  return <InquiriesClient initialInquiries={inquiries} />;
}
