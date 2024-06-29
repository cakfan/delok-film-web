"use client";

import { getAllPost } from "@/actions/post";
import { PostWithAuthors } from "@/types/post";
import { useInfiniteQuery } from "@tanstack/react-query";

const getPost = async (page: number) => {
  const limit = 10;
  const posts = await getAllPost({
    status: "public",
    take: limit,
    skip: page > 1 ? (page - 1) * limit : 0,
  });
  return posts;
};

export default function useGetPosts(initialData: PostWithAuthors[]) {
  return useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: ({ pageParam = 1 }) => getPost(pageParam),
    initialData: { pages: [initialData], pageParams: [1] },
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      return lastPage
        ? lastPage.length > 0
          ? pages.length + 1
          : undefined
        : undefined;
    },
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });
}
