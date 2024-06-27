import { FC } from "react";
import { getPeople } from "@/actions/people";
import { notFound } from "next/navigation";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Link from "next/link";
import { countryFlag } from "@/components/icons";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";
import { getAge } from "@/actions/utils";
import PostResult from "./post-result";
import FooterComponent from "@/components/footer";

interface PeopleResultProps {
  slug?: string;
}

const PeopleResult: FC<PeopleResultProps> = async ({ slug }) => {
  const people = await getPeople({ slug });

  if (!people) notFound();

  return (
    <div className="flex w-full flex-wrap justify-center px-10 py-14 md:gap-24 lg:gap-40 lg:px-20">
      <div className="flex flex-1 flex-col gap-8">
        <div className="prose flex items-start gap-2 dark:prose-invert lg:prose-xl">
          <h1 className="flex-1">{`${people.name} (${getAge(people.birthDate)})`}</h1>
        </div>
        <div
          className="content prose text-balance dark:prose-invert lg:prose-xl"
          dangerouslySetInnerHTML={{ __html: people.bio }}
        />
        <PostResult peopleId={people.id} />
      </div>
      <div className="flex w-full flex-col md:w-1/4">
        <div className="relative mb-4 w-full overflow-hidden rounded-md">
          <AspectRatio ratio={9 / 16}>
            <Image
              src={people.avatar || "/img/default.png"}
              alt={people.name}
              fill
              className="m-0 overflow-hidden rounded-md object-cover transition-all duration-300 group-hover:scale-105"
            />
          </AspectRatio>
        </div>

        <div className="detail sticky top-10 mt-10 flex flex-col gap-2 px-3 py-2">
          <div className="prose flex flex-col gap-2 rounded-md border border-input px-3 py-2 ring-offset-background dark:prose-invert">
            <h2>Details</h2>
            <div>
              <span className="font-bold">Native Name: </span>{" "}
              {people.nativeName}
            </div>
            <div>
              <span className="font-bold">Gender: </span> {people.gender}
            </div>
            <div>
              <span className="font-bold">Birth Date: </span>{" "}
              {format(people.birthDate, "PP", { locale: enUS })}
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="w-fit font-bold">Nationality: </span>{" "}
              <span className="flex-1">
                <Link
                  href={`/country/${people.nationality.slug}`}
                  title={people.nationality.name}
                  className="flex items-center gap-1 no-underline hover:text-primary"
                >
                  {countryFlag(people.nationality.name)}
                  <span>{people.nationality.name}</span>
                </Link>
              </span>
            </div>
          </div>
          <FooterComponent />
        </div>
      </div>
    </div>
  );
};

export default PeopleResult;
