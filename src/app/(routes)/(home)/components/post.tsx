import { FC } from "react";
import { PostWithMovieAndDrama } from "@/types/post";
import { Each } from "@/components/ui/Each";
import DFCard from "@/components/card";

interface HomePostProps {
  posts: PostWithMovieAndDrama[] | null;
}

const HomePost: FC<HomePostProps> = ({ posts }) => {
  if (posts?.length) {
    return (
      <div className="my-8 grid w-full grid-cols-2 gap-4 md:grid-cols-4 md:gap-y-14 lg:grid-cols-5">
        <Each of={posts} render={(post) => <DFCard post={post} />} />
      </div>
    );
  }

  return (
    <div className="prose dark:prose-invert lg:prose-xl">
      <p>No post</p>
    </div>
  );
};

export default HomePost;
