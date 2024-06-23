import type { Metadata } from "next";
import { getPeople } from "@/actions/people";
import { Suspense } from "react";
import PeopleResult from "./components/people-result";

interface DetailPeopleProps {
  params: { slug: string };
}

export async function generateMetadata({
  params: { slug },
}: DetailPeopleProps): Promise<Metadata> {
  const people = await getPeople({ slug });
  return {
    title: `${people?.name} ${people?.nativeName ? `(${people.nativeName})` : ""}`,
    description: people?.bio,
    openGraph: {
      title: `${people?.name} ${people?.nativeName ? `(${people.nativeName})` : ""}`,
      description: people?.bio,
      images: [people?.avatar ?? "/default.png"],
    },
  };
}

export default async function DetailPeople({
  params: { slug },
}: DetailPeopleProps) {
  return (
    <article className="w-full space-y-4">
      <Suspense fallback={<p>Loading data</p>}>
        <PeopleResult slug={slug} />
      </Suspense>
    </article>
  );
}
