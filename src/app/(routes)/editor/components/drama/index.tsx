import { countryFlag } from "@/components/icons";
import FormDrama from "./form";
import { getDrama } from "@/actions/drama";
import { getAllCountries } from "@/actions/country";
import { CountryWithFlag } from "@/types/post/country";
import { getAllCategories } from "@/actions/categoy";
import { getAllPeoples } from "@/actions/people";

const EditorDrama = async ({ id }: { id: string }) => {
  const posts = await getDrama({ id });

  const countries = (await getAllCountries({})) ?? [];

  const categories = (await getAllCategories({})) ?? [];

  const peoples = (await getAllPeoples()) ?? [];

  let formattedCountries: CountryWithFlag[] = [];
  if (countries?.length) {
    formattedCountries = countries.map((item) => ({
      id: item.id,
      name: item.name,
      icon: countryFlag(item.name),
    }));
  }

  return (
    <div className="w-full space-y-4 p-8">
      <FormDrama
        initialData={posts}
        countries={formattedCountries}
        categories={categories}
        peoples={peoples}
      />
    </div>
  );
};

export default EditorDrama;
