import type { Metadata } from "next";
import { searchPost } from "@/actions/post";
import SearchBox from "./components/client";
import PostResult from "./components/post-result";
import PeopleResult from "./components/people-result";
import { searchPeople } from "@/actions/people";
import { Suspense } from "react";
import PostSkeleton from "@/components/card/skeleton";

interface SearchProps {
  searchParams: {
    q?: string;
  };
}

export const metadata = ({ searchParams: { q } }: SearchProps): Metadata => ({
  title: q ? `Search "${q}"` : "Search",
  description: "Find movies and dramas",
});

export default async function SearchPage({ searchParams: { q } }: SearchProps) {
  const posts = q ? await searchPost({ query: q }) : [];
  const peoples = q ? await searchPeople({ query: q }) : [];
  return (
    <div className="min-h-screen w-full px-20 py-10">
      <SearchBox />
      <div className="mt-14 flex w-full flex-col gap-10">
        <Suspense fallback={<PostSkeleton total={4} />}>
          <PeopleResult peoples={peoples} />
          <PostResult posts={posts} />
        </Suspense>
      </div>
    </div>
  );
}
