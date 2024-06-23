import prismadb from "@/config/prisma";
import { Metadata } from "next";
import { format } from "date-fns";
import { ClientColumn } from "./components/columns";
import PostClient from "./components/client";
import { Country } from "@prisma/client";

export const metadata: Metadata = {
  title: "Posts",
  description: "Manage posts for this site",
};

export default async function DashboardPeoples() {
  const posts = await prismadb.post.findMany({
    orderBy: {
      updatedAt: "desc",
    },
    include: {
      movie: {
        include: {
          countries: true,
        },
      },
      drama: {
        include: {
          countries: true,
        },
      },
    },
  });

  const getCountry = (
    type: string,
    movieCountries?: Country[] | null,
    dramaCountries?: Country[] | null,
  ): string => {
    const countries =
      type === "movie"
        ? movieCountries
        : type === "drama"
          ? dramaCountries
          : null;
    return countries && countries.length ? countries[0].name : "";
  };

  const formatted: ClientColumn[] = posts.map((item) => ({
    id: item.id,
    title: item.title,
    slug: item.slug,
    type: item.type,
    status: item.status,
    poster: item.movie?.poster ?? item.drama?.poster ?? "/no-image.png",
    releaseDate:
      format(
        item.movie?.releaseDate
          ? item.movie.releaseDate
          : item.drama?.airedEnd!,
        "dd MMMM yyyy",
      ) ?? "NA",
    country: getCountry(
      item.type,
      item.movie?.countries,
      item.drama?.countries,
    ),
  }));

  return <PostClient data={formatted} />;
}
