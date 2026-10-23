import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="container mx-auto px-6 py-12 lg:px-12 animate-pulse">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="space-y-6 lg:col-span-5">
          <Skeleton className="h-4 w-32 bg-muted/50" />
          <Skeleton className="h-12 w-full bg-muted/60" />
          <Skeleton className="h-20 w-full bg-muted/40" />
          <div className="space-y-4 pt-6">
            <Skeleton className="h-16 w-full bg-muted/40" />
            <Skeleton className="h-16 w-full bg-muted/40" />
            <Skeleton className="h-16 w-full bg-muted/40" />
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="border border-border p-8 space-y-6">
            <Skeleton className="h-6 w-48 bg-muted/50" />
            <Skeleton className="h-24 w-full bg-muted/40" />
            <Skeleton className="h-6 w-48 bg-muted/50" />
            <Skeleton className="h-16 w-full bg-muted/40" />
            <Skeleton className="h-32 w-full bg-muted/40" />
            <Skeleton className="h-12 w-full bg-muted/60" />
          </div>
        </div>
      </div>
    </div>
  );
}
