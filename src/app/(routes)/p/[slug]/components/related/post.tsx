import { getRelated } from "@/actions/post";
import DFCard from "@/components/card";
import { Each } from "@/components/ui/Each";
import { PostWithMovieAndDrama } from "@/types/post";
import React, { FC } from "react";

interface RelatedPostItemProps {
  postId: string;
}

const RelatedPostItem: FC<RelatedPostItemProps> = async ({ postId }) => {
  const posts = await getRelated(postId);
  if (posts?.length) {
    return (
      <div className="grid w-full grid-cols-6 gap-4 md:grid-cols-4 lg:grid-cols-2">
        <Each of={posts} render={(post) => <DFCard post={post} />} />
      </div>
    );
  }
  return null;
};

export default RelatedPostItem;
