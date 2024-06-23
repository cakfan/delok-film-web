import { FC } from "react";
import { Each } from "@/components/ui/Each";
import DFCard from "@/components/card";
import { searchPost } from "@/actions/post";

interface PostResultProps {
  q?: string;
}

const PostResult: FC<PostResultProps> = async ({ q }) => {
  const posts = q ? await searchPost({ query: q }) : [];

  if (!posts?.length) return null;

  return (
    <section id="posts" className="flex min-h-screen justify-center">
      <div className="my-8 grid w-full grid-cols-2 gap-4 md:grid-cols-4 md:gap-y-14 lg:grid-cols-6">
        <Each of={posts} render={(post) => <DFCard post={post} />} />
      </div>
    </section>
  );
};

export default PostResult;
