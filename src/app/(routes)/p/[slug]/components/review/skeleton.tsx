import { Skeleton } from "@/components/ui/skeleton";

const ReviewSkeleton = ({ total = 1 }: { total?: number }) => {
  return (
    <div className="flex w-full flex-col gap-10">
      {Array.from({ length: total }, (_, i) => (
        <div key={i} className="flex w-full flex-col gap-2">
          <div className="flex w-full items-center gap-2">
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-5 flex-1 rounded-md" />
          </div>
          <Skeleton className="h-3 w-full rounded-md" />
          <Skeleton className="h-3 w-full rounded-md" />
          <Skeleton className="h-3 w-full rounded-md" />
        </div>
      ))}
    </div>
  );
};

export default ReviewSkeleton;
