import { Skeleton } from "@/components/ui/skeleton";

export function AddOfferPageSkeleton() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <div className="max-w-md w-full bg-card p-8 rounded-lg shadow-md space-y-4">
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    </div>
  );
}
