import { Skeleton } from "@/components/ui/skeleton";

export default function AdminLoginLoading() {
  return (
    <div className="flex min-h-svh items-center justify-center p-4">
      <Skeleton className="h-96 w-full max-w-md" />
    </div>
  );
}
