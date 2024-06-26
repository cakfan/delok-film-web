import { FC } from "react";
import Link from "next/link";
import { Each } from "@/components/ui/Each";
import { countryFlag } from "@/components/icons";
import { PostWithAuthors } from "@/types/post";

interface CountriesProps {
  post: PostWithAuthors;
}

const CountriesItems: FC<CountriesProps> = ({ post }) => {
  if (!post?.countries || !post.countries.length) return null;

  return (
    <div className="flex w-full flex-wrap gap-2">
      <span className="w-fit font-bold">Country: </span>{" "}
      <span className="flex-1">
        <Each
          of={post.countries}
          render={(country) => (
            <Link
              href={`/country?q=${country.slug!}`}
              title={country.name ?? "NA"}
              className="flex items-center gap-1 no-underline hover:text-primary"
            >
              {countryFlag(country.name!)}
              <span>{country.name}</span>
            </Link>
          )}
        />
      </span>
    </div>
  );
};

export default CountriesItems;
