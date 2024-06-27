import { Skeleton } from "../ui/skeleton";

const SidebarSkeleton = () => {
  return (
    <div className="my-8 w-full">
      {Array.from({ length: 4 }, (_, i) => (
        <div key={i} className="mb-4 flex items-center gap-4 px-3">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-5 flex-1 rounded-md" />
        </div>
      ))}
    </div>
  );
};

export default SidebarSkeleton;
