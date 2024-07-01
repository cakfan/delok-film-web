"use client";

import { FC } from "react";
import { PostWithAuthors } from "@/types/post";
import { FacebookShare, TwitterShare, InstapaperShare } from "react-share-kit";
import { useOrigin } from "@/hooks/useOrigin";

interface ShareButtonProps {
  post: PostWithAuthors;
}

const ShareButton: FC<ShareButtonProps> = ({ post }) => {
  const origin = useOrigin();
  const url = `${origin}/p/${post.slug}`;
  return (
    <div className="share-button my-10 flex flex-wrap items-center justify-center gap-4">
      <FacebookShare
        size={32}
        borderRadius={100}
        url={url}
        quote={post.title}
        hashtag="#delokfilm"
      />
      <TwitterShare
        size={32}
        borderRadius={100}
        url={url}
        title={post.title}
        hashtags={["delokfilm"]}
      />
      <InstapaperShare size={32} borderRadius={100} url={url} />
    </div>
  );
};

export default ShareButton;
