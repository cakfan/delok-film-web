import PostSkeleton from "@/components/card/skeleton";
import { Suspense } from "react";
import RecentPost from "./components/recent-post";

export default async function Home() {
  return (
    <div className="flex w-full flex-col px-10 py-5 lg:px-20 lg:py-10">
      <div className="prose dark:prose-invert">
        <h1>Recent</h1>
      </div>

      <div className="w-full pb-10">
        <Suspense fallback={<PostSkeleton total={7} />}>
          <RecentPost />
        </Suspense>
      </div>
    </div>
  );
}
