import { FC } from "react";
import { Each } from "@/components/ui/Each";
import DFCard from "@/components/card";
import { getPostByCountry } from "@/actions/post";

interface PostResultProps {
  country?: string;
}

const PostResult: FC<PostResultProps> = async ({ country }) => {
  const posts = country ? await getPostByCountry({ country }) : [];
  if (posts?.length) {
    return (
      <div className="my-8 grid w-full grid-cols-2 gap-4 md:grid-cols-5 md:gap-y-14">
        <Each of={posts} render={(post) => <DFCard post={post} />} />
      </div>
    );
  }

  return (
    <div className="prose w-full dark:prose-invert lg:prose-xl">
      <p>{country ? "No post" : "Select country"}</p>
    </div>
  );
};

export default PostResult;
