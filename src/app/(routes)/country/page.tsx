import type { Metadata } from "next";
import CategoryList from "./components/client";
import PostResult from "./components/result";
import { Suspense } from "react";
import PostSkeleton from "@/components/card/skeleton";
import { getAllCountries, getCountry } from "@/actions/country";
import CountryList from "./components/client";

interface CountryProps {
  searchParams: {
    q?: string;
  };
}

export const generateMetadata = async ({
  searchParams: { q },
}: CountryProps): Promise<Metadata> => {
  const country = await getCountry({ slug: q });
  return {
    title: country ? country.name : "Country",
    description: "Find country for movies and dramas",
  };
};

export default async function CountryPage({
  searchParams: { q },
}: CountryProps) {
  const countries = await getAllCountries({});
  return (
    <div className="min-h-screen w-full px-20 py-10">
      <div className="prose dark:prose-invert">
        <h1 className="mb-2">Country</h1>
        <p className="m-0">Find movies and dramas by country</p>
      </div>

      <CountryList countries={countries} />

      <section id="posts" className="flex min-h-screen w-full justify-center">
        <Suspense fallback={<PostSkeleton total={4} />}>
          <PostResult country={q} />
        </Suspense>
      </section>
    </div>
  );
}
