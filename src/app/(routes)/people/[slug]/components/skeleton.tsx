import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Skeleton } from "@/components/ui/skeleton";

const PostSkeleton = () => {
  return (
    <div className="flex w-full flex-wrap justify-center px-10 py-14 md:gap-24 lg:gap-40 lg:px-20">
      <div className="flex flex-1 flex-col gap-8">
        <Skeleton className="h-10 w-3/4 rounded-md" />
        <div className="mt-10 flex flex-col gap-4">
          <Skeleton className="h-4 w-full rounded-md" />
          <Skeleton className="h-4 w-3/4 rounded-md" />
          <Skeleton className="h-4 w-1/2 rounded-md" />
          <Skeleton className="h-4 w-2/3 rounded-md" />
          <Skeleton className="h-4 w-full rounded-md" />
          <Skeleton className="h-4 w-3/4 rounded-md" />
          <Skeleton className="h-4 w-1/2 rounded-md" />
          <Skeleton className="h-4 w-2/3 rounded-md" />
          <Skeleton className="h-4 w-4/5 rounded-md" />
          <Skeleton className="h-4 w-full rounded-md" />
        </div>
      </div>
      <div className="flex w-full flex-col gap-4 md:w-1/4">
        <AspectRatio ratio={9 / 16}>
          <Skeleton className="h-full w-full rounded-md" />
        </AspectRatio>
        <Skeleton className="mt-8 h-4 w-3/4 rounded-md" />
        <Skeleton className="h-4 w-full rounded-md" />
        <Skeleton className="h-4 w-full rounded-md" />
      </div>
    </div>
  );
};

export default PostSkeleton;
