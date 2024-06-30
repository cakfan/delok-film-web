import PostSkeleton from "@/components/card/skeleton";
import { Suspense } from "react";
import HomePost from "./components/post-wrapper";
import QueryProvider from "./components/query-provider";
import { getAllPost } from "@/actions/post";
import RecentPost from "./components/recent-post";

export default async function Home() {
  return (
    <div className="flex w-full flex-col p-10 lg:px-20">
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
