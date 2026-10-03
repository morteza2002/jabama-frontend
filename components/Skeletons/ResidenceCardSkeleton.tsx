import { Skeleton } from "@/components/ui/skeleton";
import "./ResidenceCardSkeleton.css";

export default function ResidenceCardSkeleton() {
  return (
    <div className="residence-card-skeleton">
      <div className="residence-card-skeleton-image">
        <Skeleton className="h-full w-full" />

        <div className="residence-card-skeleton-top">
          <Skeleton className="h-7 w-32 rounded-md" />
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
      </div>

      <div className="residence-card-skeleton-content">
        <Skeleton className="h-4 w-12" />

        <Skeleton className="h-6 w-3/4" />

        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />

        <div className="residence-card-skeleton-info">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-24" />
        </div>

        <Skeleton className="h-5 w-44" />
      </div>
    </div>
  );
}