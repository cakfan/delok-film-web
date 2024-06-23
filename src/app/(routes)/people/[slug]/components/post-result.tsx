import { FC } from "react";
import { PostWithMovieAndDrama } from "@/types/post";
import { Each } from "@/components/ui/Each";
import DFCard from "@/components/card";

interface PostResultProps {
  posts: PostWithMovieAndDrama[] | null;
}

const PostResult: FC<PostResultProps> = ({ posts }) => {
  if (!posts?.length) return null;

  return (
    <section id="posts" className="w-full py-20">
      <div className="prose dark:prose-invert lg:prose-xl">
        <h2>Movies & Dramas</h2>
      </div>
      <div className="my-8 grid w-full grid-cols-2 gap-4 md:grid-cols-4 md:gap-y-14">
        <Each of={posts} render={(post) => <DFCard post={post} />} />
      </div>
    </section>
  );
};

export default PostResult;
