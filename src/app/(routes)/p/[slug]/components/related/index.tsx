import { FC, Suspense } from "react";
import { getRelated } from "@/actions/post";
import DFCard from "@/components/card";
import { Each } from "@/components/ui/Each";
import PostSkeleton from "@/components/card/skeleton";

interface RelatedPostProps {
  postId: string;
}

const RelatedPost: FC<RelatedPostProps> = async ({ postId }) => {
  const relatedPost = await getRelated(postId);
  return (
    <div className="related prose mt-10 flex flex-col dark:prose-invert">
      <h2>Related</h2>
      <Suspense fallback={<PostSkeleton />}>
        <div className="grid w-full grid-cols-6 gap-4 md:grid-cols-4 lg:grid-cols-2">
          {relatedPost?.length && (
            <Each of={relatedPost} render={(post) => <DFCard post={post} />} />
          )}
        </div>
      </Suspense>
    </div>
  );
};

export default RelatedPost;
