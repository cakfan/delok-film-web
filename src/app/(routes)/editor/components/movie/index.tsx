import { countryFlag } from "@/components/icons";
import FormMovie from "./form";
import { getMovie } from "@/actions/movie";
import { getAllCountries } from "@/actions/country";
import { CountryWithFlag } from "@/types/post/country";
import { getAllCategories } from "@/actions/categoy";
import { getAllPeoples } from "@/actions/people";

const EditorMovie = async ({ id }: { id: string }) => {
  const posts = await getMovie({ id });

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
      <FormMovie
        initialData={posts}
        countries={formattedCountries}
        categories={categories}
        peoples={peoples}
      />
    </div>
  );
};

export default EditorMovie;
