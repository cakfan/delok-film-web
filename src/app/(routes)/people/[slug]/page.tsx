import type { Metadata } from "next";
import Image from "next/image";
import { getPostsByPeople } from "@/actions/post";
import { notFound } from "next/navigation";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Link from "next/link";
import { countryFlag } from "@/components/icons";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";
import { getPeople } from "@/actions/people";
import { getAge } from "@/actions/utils";
import PostResult from "./components/post-result";

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
  const people = await getPeople({ slug });

  if (!people) notFound();

  const posts = await getPostsByPeople({ people: people.id });

  return (
    <article className="w-full space-y-4">
      <div className="flex w-full flex-wrap justify-center px-10 py-14 md:gap-24 lg:gap-40 lg:px-20">
        <div className="flex flex-1 flex-col gap-8">
          <div className="prose flex items-start gap-2 dark:prose-invert lg:prose-xl">
            <h1 className="flex-1">{`${people.name} (${getAge(people.birthDate)})`}</h1>
          </div>
          <div
            className="content prose text-balance dark:prose-invert lg:prose-xl"
            dangerouslySetInnerHTML={{ __html: people.bio }}
          />

          <PostResult posts={posts} />

          {/* <DetailCast post={post} />
          <Review post={post} /> */}
        </div>
        <div className="flex w-full flex-col md:w-1/4">
          <div className="relative mb-4 w-full overflow-hidden rounded-md">
            <AspectRatio ratio={9 / 16}>
              <Image
                src={people.avatar ?? "/no-image.png"}
                alt={people.name}
                fill
                className="m-0 overflow-hidden rounded-md object-cover transition-all duration-300 group-hover:scale-105"
              />
            </AspectRatio>
          </div>

          <div className="detail prose sticky top-10 mt-10 flex flex-col gap-2 rounded-md border border-input px-3 py-2 ring-offset-background dark:prose-invert">
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
          {/* <RelatedPost postId={post.id!} /> */}
        </div>
      </div>
    </article>
  );
}
