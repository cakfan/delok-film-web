import { Metadata } from "next";
import { format } from "date-fns";
import { ClientColumn } from "./components/columns";
import PeopleClient from "./components/client";
import { getAge } from "@/actions/utils";
import { getAllPeoples } from "@/actions/people";
import { enUS } from "date-fns/locale";

export const metadata: Metadata = {
  title: "Peoples",
  description: "Manage peoples for this site",
};

export default async function DashboardPeoples() {
  const peoples = await getAllPeoples();

  const formatted: ClientColumn[] = peoples?.length
    ? peoples.map((item) => ({
        id: item.id,
        name: `${item.name} (${item.birthDate ? getAge(item.birthDate) : "NA"})`,
        avatar: item.avatar || "/img/default.png",
        birthDate: item.birthDate
          ? `${format(item.birthDate, "PPP", { locale: enUS })}`
          : "NA",
        nationality: item.nationality?.name!,
      }))
    : [];

  return <PeopleClient data={formatted} />;
}
