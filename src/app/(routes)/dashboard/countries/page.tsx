import { Metadata } from "next";
import { ClientColumn } from "./components/columns";
import CountryClient from "./components/client";
import { getAllCountries } from "@/actions/country";

export const metadata: Metadata = {
  title: "Countries",
  description: "Manage countries for this site",
};

export default async function DashboardCountries() {
  const countries = await getAllCountries();

  let formatted: ClientColumn[] = [];
  if (countries?.length) {
    formatted = countries.map((item) => ({
      id: item.id,
      name: item.name,
      slug: item.slug,
    }));
  }

  return <CountryClient data={formatted} />;
}
