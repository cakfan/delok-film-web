import { getRelated } from "@/actions/post";
import DFCard from "@/components/card";
import { Each } from "@/components/ui/Each";
import { PostWithAuthors } from "@/types/post";
import React, { FC } from "react";

interface RelatedPostItemProps {
  post: PostWithAuthors;
}

const RelatedPostItem: FC<RelatedPostItemProps> = async ({ post }) => {
  const categoryIds = post.categories?.map((category) => category.id) || [];
  const countryIds = [...(post.countries?.map((country) => country.id) || [])];
  const posts = await getRelated(post.id!, categoryIds, countryIds);
  if (posts?.length) {
    return (
      <div className="grid w-full grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-2">
        <Each of={posts} render={(post) => <DFCard post={post} />} />
      </div>
    );
  }
  return null;
};

export default RelatedPostItem;
