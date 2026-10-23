import { Skeleton } from "@/components/ui/skeleton";

export default function ProductDetailLoading() {
  return (
    <div className="min-h-svh bg-background p-8">
      <div className="container mx-auto grid gap-12 lg:grid-cols-2 animate-pulse">
        <Skeleton className="aspect-square w-full" />
        <div className="space-y-6">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-12 w-3/4" />
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-40 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
      </div>
    </div>
  );
}
