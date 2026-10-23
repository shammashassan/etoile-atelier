import { Skeleton } from "@/components/ui/skeleton";

export default function AdminInquiriesLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      <Skeleton className="h-8 w-64" />
      <Skeleton className="h-4 w-96" />
      <Skeleton className="h-80 w-full" />
    </div>
  );
}
