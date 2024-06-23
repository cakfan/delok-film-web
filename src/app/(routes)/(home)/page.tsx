import { getAllPost } from "@/actions/post";
import DFCard from "@/components/card";
import PostSkeleton from "@/components/card/skeleton";
import { Each } from "@/components/ui/Each";
import { Suspense } from "react";

export default async function Home() {
  const posts = await getAllPost({});
  return (
    <div className="flex w-full flex-col p-10 lg:px-20">
      <div className="prose dark:prose-invert">
        <h1>Recent</h1>
      </div>

      <Suspense fallback={<PostSkeleton total={6} />}>
        <div className="my-8 grid w-full grid-cols-2 gap-4 md:grid-cols-4 md:gap-y-14 lg:grid-cols-5">
          {posts?.length ? (
            <Each of={posts} render={(post) => <DFCard post={post} />} />
          ) : (
            <p>No post</p>
          )}
        </div>
      </Suspense>
    </div>
  );
}
