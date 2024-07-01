import { FC } from "react";
import RelatedPostItem from "./post";
import { PostWithAuthors } from "@/types/post";

interface RelatedPostProps {
  post: PostWithAuthors;
}

const RelatedPost: FC<RelatedPostProps> = async ({ post }) => {
  return (
    <div className="related prose mt-10 flex flex-col dark:prose-invert">
      <h2>Related</h2>
      <RelatedPostItem post={post} />
    </div>
  );
};

export default RelatedPost;
