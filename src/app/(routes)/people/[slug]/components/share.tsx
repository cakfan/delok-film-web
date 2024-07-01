"use client";

import { FC } from "react";
import { FacebookShare, TwitterShare, InstapaperShare } from "react-share-kit";
import { PeopleWithAuthors } from "@/types/post/people";
import { useOrigin } from "@/hooks/useOrigin";

interface ShareButtonProps {
  people: PeopleWithAuthors;
}

const ShareButton: FC<ShareButtonProps> = ({ people }) => {
  const origin = useOrigin();
  const url = `${origin}/people/${people.slug}`;
  return (
    <div className="share-button my-10 flex flex-wrap items-center justify-center gap-4">
      <FacebookShare
        size={32}
        borderRadius={100}
        url={url}
        quote={people.name}
        hashtag="#delokfilm"
      />
      <TwitterShare
        size={32}
        borderRadius={100}
        url={url}
        title={people.name}
        hashtags={["#delokfilm"]}
      />
      <InstapaperShare size={32} borderRadius={100} url={url} />
    </div>
  );
};

export default ShareButton;
