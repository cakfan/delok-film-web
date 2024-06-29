"use client";

import { FC, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import useGetPosts from "@/hooks/useGetPosts";
import { Each } from "@/components/ui/Each";
import DFCard from "@/components/card";
import { Button } from "@/components/ui/button";
import { PostWithAuthors } from "@/types/post";
import { Loader2 } from "lucide-react";
import PostSkeleton from "@/components/card/skeleton";

interface QueryProviderProps {
  initialData: PostWithAuthors[];
}

const HomePost: FC<QueryProviderProps> = ({ initialData }) => {
  const { ref, inView } = useInView();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetPosts(initialData);

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, inView, isFetchingNextPage]);

  const posts = data?.pages.flatMap((page) => page);

  return (
    <div className="flex w-full flex-col">
      {posts?.length ? (
        <div className="my-8 grid w-full grid-cols-2 gap-4 md:grid-cols-4 md:gap-y-14 lg:grid-cols-5">
          <Each of={posts} render={(post) => <DFCard post={post!} />} />
        </div>
      ) : (
        <div className="w-full">
          {isFetchingNextPage && <PostSkeleton total={7} />}
        </div>
      )}

      <Button
        ref={ref}
        onClick={() => {
          if (hasNextPage) {
            fetchNextPage();
          }
        }}
        disabled={isFetchingNextPage}
        variant="secondary"
        className="mx-auto my-4 rounded-full"
      >
        {isFetchingNextPage && (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        )}
        {isFetchingNextPage
          ? "Loading more..."
          : hasNextPage
            ? "Load more"
            : "👌 Nothing more to load"}
      </Button>
    </div>
  );
};

export default HomePost;
