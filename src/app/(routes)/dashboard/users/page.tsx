import { Metadata } from "next";
import { format } from "date-fns";
import { ClientColumn } from "./components/columns";
import ReviewClient from "./components/client";
import { enUS } from "date-fns/locale";
import { getAllUsers } from "@/actions/user";

export const metadata: Metadata = {
  title: "Users",
  description: "Manage users for this site",
};

export default async function DashboardReviews() {
  const users = await getAllUsers();

  const formatted: ClientColumn[] = users?.length
    ? users.map((item) => ({
        id: item.id!,
        name: `${item.name} (@${item.username})` ?? "NA",
        username: item.username ?? "NA",
        avatar: item.image || "/imgm/default.png",
        createdAt: item.createdAt
          ? `${format(item.createdAt, "PPP", { locale: enUS })}`
          : "NA",
        role: item.role!,
      }))
    : [];

  return <ReviewClient data={formatted} />;
}
