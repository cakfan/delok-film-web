import { FC } from "react";
import { PostWithMovieAndDrama } from "@/types/post";
import { Each } from "@/components/ui/Each";
import DFCard from "@/components/card";

interface PostResultProps {
  posts: PostWithMovieAndDrama[] | null;
  category?: string;
}

const PostResult: FC<PostResultProps> = ({ posts, category }) => {
  if (posts?.length) {
    return (
      <div className="my-8 grid w-full grid-cols-2 gap-4 md:grid-cols-5 md:gap-y-14">
        <Each of={posts} render={(post) => <DFCard post={post} />} />
      </div>
    );
  }

  return (
    <div className="prose w-full dark:prose-invert lg:prose-xl">
      <p>{category ? "No post" : "Select category"}</p>
    </div>
  );
};

export default PostResult;
