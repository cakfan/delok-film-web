import { Skeleton } from "@/components/ui/skeleton";

const CastSkeleton = () => {
  return (
    <div className="flex w-full flex-wrap gap-4">
      {Array.from({ length: 4 }, (_, i) => (
        <div key={i} className="flex w-10 flex-col gap-2">
          <Skeleton className="h-10 w-full rounded-md" />
          <Skeleton className="h-4 w-full rounded-md" />
        </div>
      ))}
    </div>
  );
};

export default CastSkeleton;
