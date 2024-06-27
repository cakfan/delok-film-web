import { Suspense } from "react";
import type { Metadata } from "next";
import { getPost } from "@/actions/post";
import PostResult from "./components/post";
import PostSkeleton from "./components/skeleton";

interface DetailPageProps {
  params: { slug?: string };
}

export async function generateMetadata({
  params: { slug },
}: DetailPageProps): Promise<Metadata> {
  const post = await getPost({ slug });
  return {
    title: post?.title,
    description: post?.content,
    openGraph: {
      title: post?.title,
      description: post?.content,
      images: [post?.poster || "/img/default.png"],
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
