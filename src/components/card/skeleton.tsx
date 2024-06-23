import { Skeleton } from "../ui/skeleton";

const PostSkeleton = ({ total = 2 }: { total?: number }) => {
  return (
    <div className="my-8 flex w-full flex-wrap gap-4">
      {Array.from({ length: total }, (_, i) => (
        <Skeleton key={i} className="h-56 w-28" />
      ))}
    </div>
  );
};

export default PostSkeleton;
