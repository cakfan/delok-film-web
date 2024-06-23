import prismadb from "@/config/prisma";
import { Country } from "@prisma/client";
import { toast } from "sonner";

export const getCountry = async ({
  id,
  slug,
}: {
  id?: string;
  slug?: string;
}): Promise<Country | null> => {
  if (!id && !slug) {
    const msg = "You have to provide an id or slug";
    toast.error(msg);
    return null;
  }

  const country = await prismadb.country.findFirst({
    where: {
      OR: [{ id }, { slug }],
    },
  });

  return country;
};
