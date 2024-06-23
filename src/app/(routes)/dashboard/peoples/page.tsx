import prismadb from "@/config/prisma";
import { Metadata } from "next";
import { format } from "date-fns";
import { ClientColumn } from "./components/columns";
import CountryClient from "./components/client";
import { getAge } from "@/actions/utils";

export const metadata: Metadata = {
  title: "Peoples",
  description: "Manage peoples for this site",
};

export default async function DashboardPeoples() {
  const peoples = await prismadb.people.findMany({
    orderBy: {
      updatedAt: "desc",
    },
    include: {
      nationality: true,
    },
  });

  const formatted: ClientColumn[] = peoples.map((item) => ({
    id: item.id,
    name: `${item.name} (${getAge(item.birthDate)})`,
    avatar: item.avatar ?? "",
    birthDate: item.birthDate
      ? `${format(item.birthDate, "dd MMMM yyyy")}`
      : "NA",
    nationality: item.nationality?.name!,
  }));

  return <CountryClient data={formatted} />;
}
