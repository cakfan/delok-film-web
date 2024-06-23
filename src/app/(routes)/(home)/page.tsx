import { getAllPost } from "@/actions/post";
import DFCard from "@/components/card";
import PostSkeleton from "@/components/card/skeleton";
import { Each } from "@/components/ui/Each";
import { Suspense } from "react";
import HomePost from "./components/post";

export default async function Home() {
  const posts = await getAllPost({});
  return (
    <div className="flex w-full flex-col p-10 lg:px-20">
      <div className="prose dark:prose-invert">
        <h1>Recent</h1>
      </div>

      <div className="w-full">
        <Suspense fallback={<PostSkeleton total={6} />}>
          <HomePost posts={posts} />
        </Suspense>
      </div>
    </div>
  );
}
