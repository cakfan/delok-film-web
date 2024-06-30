import type { Metadata } from "next";
import SearchBox from "./components/client";
import PostResult from "./components/post-result";
import PeopleResult from "./components/people-result";
import { Suspense } from "react";
import PostSkeleton from "@/components/card/skeleton";

interface SearchProps {
  searchParams: {
    q?: string;
  };
}

export const generateMetadata = ({
  searchParams: { q },
}: SearchProps): Metadata => ({
  title: q ? `Search "${q}"` : "Search",
  description: "Find movies and dramas",
});

export default function SearchPage({ searchParams: { q } }: SearchProps) {
  return (
    <div className="min-h-screen w-full px-10 py-5 lg:px-20 lg:py-10">
      <SearchBox />
      <div className="mt-14 flex w-full flex-col gap-10">
        <Suspense fallback={<PostSkeleton total={4} />}>
          <PeopleResult q={q} />
          <PostResult q={q} />
        </Suspense>
      </div>
    </div>
  );
}
