import { FC } from "react";
import { PeopleWithAuthors } from "@/types/post/people";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Link from "next/link";
import { countryFlag } from "@/components/icons";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";
import ShareButton from "./share";
import FooterComponent from "@/components/footer";

interface MoreInfoProps {
  people: PeopleWithAuthors;
}

const MoreInfo: FC<MoreInfoProps> = ({ people }) => {
  return (
    <div className="flex w-full flex-col">
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

      <ShareButton people={people} />

      <div className="detail sticky top-10 mt-10 flex flex-col gap-2 py-2">
        <div className="prose flex flex-col gap-2 rounded-md border border-input px-3 py-2 ring-offset-background dark:prose-invert">
          <h2>Details</h2>
          <div>
            <span className="font-bold">Native Name: </span> {people.nativeName}
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
  );
};

export default MoreInfo;
