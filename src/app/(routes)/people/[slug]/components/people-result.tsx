import { FC } from "react";
import { getPeople } from "@/actions/people";
import { notFound } from "next/navigation";
import { getAge } from "@/actions/utils";
import PostResult from "./post-result";
import MoreInfo from "./info";

interface PeopleResultProps {
  slug?: string;
}

const PeopleResult: FC<PeopleResultProps> = async ({ slug }) => {
  const people = await getPeople({ slug });

  if (!people) notFound();

  return (
    <div className="flex h-auto w-full flex-wrap justify-center px-10 py-14 md:gap-24 lg:gap-40 lg:px-20">
      <div className="flex flex-1 flex-col gap-8">
        <div className="prose flex items-start gap-2 dark:prose-invert lg:prose-xl">
          <h1 className="flex-1">{`${people.name} (${people.birthDate ? getAge(people.birthDate) : "NA"})`}</h1>
        </div>
        <div className="flex flex-col md:hidden">
          <MoreInfo people={people} />
        </div>
        <div
          className="content prose text-balance dark:prose-invert lg:prose-xl"
          dangerouslySetInnerHTML={{ __html: people.bio }}
        />
        <PostResult peopleId={people.id} />
      </div>
      <div className="flex w-full flex-col md:w-1/4">
        <div className="hidden w-full flex-col md:flex">
          <MoreInfo people={people} />
        </div>
      </div>
    </div>
  );
};

export default PeopleResult;
