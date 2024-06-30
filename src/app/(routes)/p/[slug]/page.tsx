import { Suspense, cache } from "react";
import type { Metadata } from "next";
import { getPost } from "@/actions/post";
import PostResult from "./components/post";
import PostSkeleton from "./components/skeleton";

export const getPostDetail = cache(async (slug?: string) => {
  const post = await getPost({ slug });
  return post;
});

export interface DetailPageProps {
  params: { slug?: string };
}

export async function generateMetadata({
  params: { slug },
}: DetailPageProps): Promise<Metadata> {
  const post = await getPostDetail(slug);
  return {
    title: post?.title,
    description: post?.content.replace(/(<([^>]+)>)/gi, ""),
    openGraph: {
      title:
        post && post.title.length < 30
          ? `${post?.title} — Delok Film`
          : post?.title,
      description: post?.content.replace(/(<([^>]+)>)/gi, ""),
      images: [post?.poster || "/img/og/default.png"],
    },
  };
}

export default async function DetailPage({
  params: { slug },
}: DetailPageProps) {
  return (
    <article className="w-full space-y-4">
      <Suspense fallback={<PostSkeleton />}>
        <PostResult slug={slug} />
      </Suspense>
    </article>
  );
}
