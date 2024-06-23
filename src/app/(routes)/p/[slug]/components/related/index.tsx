import { FC, Suspense } from "react";
import { getRelated } from "@/actions/post";
import DFCard from "@/components/card";
import { Each } from "@/components/ui/Each";
import PostSkeleton from "@/components/card/skeleton";
import RelatedPostItem from "./post";

interface RelatedPostProps {
  postId: string;
}

const RelatedPost: FC<RelatedPostProps> = async ({ postId }) => {
  return (
    <div className="related prose mt-10 flex flex-col dark:prose-invert">
      <h2>Related</h2>
      <Suspense fallback={<PostSkeleton />}>
        <RelatedPostItem postId={postId} />
      </Suspense>
    </div>
  );
};

export default RelatedPost;
