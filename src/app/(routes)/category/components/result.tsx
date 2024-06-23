import { FC } from "react";
import { Each } from "@/components/ui/Each";
import DFCard from "@/components/card";
import { getAllPost } from "@/actions/post";

interface PostResultProps {
  category?: string;
}

const PostResult: FC<PostResultProps> = async ({ category }) => {
  const posts = category ? await getAllPost({ category }) : [];
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
