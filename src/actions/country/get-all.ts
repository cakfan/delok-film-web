import prismadb from "@/config/prisma";
import { Country } from "@prisma/client";

interface CountryProps {
  sortBy?: "update" | "name";
  sortOrder?: "asc" | "desc";
}

export const getAllCountries = async ({
  sortBy = "name",
  sortOrder = "asc",
}: CountryProps): Promise<Country[] | null> => {
  const orderBy = {
    update: { updatedAt: sortOrder },
    name: { name: sortOrder },
  };
  const countries = await prismadb.country.findMany({
    orderBy: orderBy[sortBy],
  });

  return countries;
};
