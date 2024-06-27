import prismadb from "@/config/prisma";
import { Country } from "@prisma/client";

export const getCountry = async ({
  id,
  slug,
}: {
  id?: string;
  slug?: string;
}): Promise<Country | null> => {
  if (!id && !slug) {
    return null;
  }

  const country = await prismadb.country.findFirst({
    where: {
      OR: [{ id }, { slug }],
    },
  });

  return country;
};
