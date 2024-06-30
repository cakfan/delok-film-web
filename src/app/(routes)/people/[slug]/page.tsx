import type { Metadata } from "next";
import { getPeople } from "@/actions/people";
import { Suspense } from "react";
import PeopleResult from "./components/people-result";
import PeopleSkeleton from "./components/skeleton";

interface DetailPeopleProps {
  params: { slug: string };
}

export async function generateMetadata({
  params: { slug },
}: DetailPeopleProps): Promise<Metadata> {
  const people = await getPeople({ slug });
  return {
    title: `${people?.name} ${people?.nativeName ? `(${people.nativeName})` : ""}`,
    description: people?.bio.replace(/(<([^>]+)>)/gi, ""),
    openGraph: {
      title: `${people?.name} ${people?.nativeName ? `(${people.nativeName})` : ""}`,
      description: people?.bio.replace(/(<([^>]+)>)/gi, ""),
      images: [people?.avatar || "/img/og/default.png"],
    },
  };
}

export default async function DetailPeople({
  params: { slug },
}: DetailPeopleProps) {
  return (
    <article className="w-full space-y-4">
      <Suspense fallback={<PeopleSkeleton />}>
        <PeopleResult slug={slug} />
      </Suspense>
    </article>
  );
}
