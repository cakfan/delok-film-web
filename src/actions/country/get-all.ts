import prismadb from "@/config/prisma";
import { Country } from "@prisma/client";

export const getAllCountries = async (): Promise<Country[] | null> => {
  const countries = await prismadb.country.findMany({
    orderBy: {
      updatedAt: "desc",
    },
  });

  return countries;
};
