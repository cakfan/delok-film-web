"use server";

import prismadb from "@/config/prisma";
import FormPeople from "./form";
import { countryFlag } from "@/components/icons";

const EditorPeople = async ({ id }: { id: string }) => {
  const people = await prismadb.people.findUnique({
    where: {
      id,
    },
    include: {
      nationality: true,
    },
  });

  const countries = await prismadb.country.findMany({
    orderBy: {
      name: "asc",
    },
  });

  const formattedCountries = countries.map((item) => ({
    id: item.id,
    name: item.name,
    icon: countryFlag(item.name),
  }));

  return (
    <div className="w-full space-y-4 p-8">
      <FormPeople initialData={people} countries={formattedCountries} />
    </div>
  );
};

export default EditorPeople;
