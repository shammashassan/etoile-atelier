import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="space-y-8 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="h-8 w-64 bg-muted/60" />
          <Skeleton className="h-4 w-96 bg-muted/40" />
        </div>
        <div className="flex gap-3">
          <Skeleton className="h-9 w-20 bg-muted/50" />
          <Skeleton className="h-9 w-32 bg-muted/50" />
        </div>
      </div>
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Skeleton className="h-48 w-full bg-muted/40" />
          <Skeleton className="h-40 w-full bg-muted/40" />
          <Skeleton className="h-64 w-full bg-muted/40" />
        </div>
        <div className="space-y-6">
          <Skeleton className="h-60 w-full bg-muted/40" />
          <Skeleton className="h-44 w-full bg-muted/40" />
        </div>
      </div>
    </div>
  );
}
