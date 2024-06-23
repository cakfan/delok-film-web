import { FC } from "react";
import RelatedPostItem from "./post";

interface RelatedPostProps {
  postId: string;
}

const RelatedPost: FC<RelatedPostProps> = async ({ postId }) => {
  return (
    <div className="related prose mt-10 flex flex-col dark:prose-invert">
      <h2>Related</h2>
      <RelatedPostItem postId={postId} />
    </div>
  );
};

export default RelatedPost;
