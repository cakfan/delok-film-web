import { FC } from "react";
import { Each } from "@/components/ui/Each";
import Link from "next/link";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { searchPeople } from "@/actions/people";

interface PeopleResultProps {
  q?: string;
}

const PeopleResult: FC<PeopleResultProps> = async ({ q }) => {
  const peoples = q ? await searchPeople({ query: q }) : [];

  if (!peoples?.length) return null;

  return (
    <section id="peoples" className="flex w-full flex-wrap gap-4">
      <Each
        of={peoples}
        render={(people) => (
          <Link
            href={`/people/${people.slug}`}
            title={people.name ?? "People"}
            className="group flex items-center justify-center gap-4 rounded-full p-1.5 pr-4 text-sm no-underline transition-all duration-300 ease-in-out hover:bg-accent"
          >
            <div className="h-14 w-14">
              <AspectRatio ratio={1 / 1}>
                <Image
                  src={people.avatar ?? "NA"}
                  alt={people.name ?? "NA"}
                  fill
                  className="m-0 overflow-hidden rounded-full object-cover transition-all duration-300 group-hover:scale-105"
                />
              </AspectRatio>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-primary">
                {people?.name}
              </span>
            </div>
          </Link>
        )}
      />
    </section>
  );
};

export default PeopleResult;
