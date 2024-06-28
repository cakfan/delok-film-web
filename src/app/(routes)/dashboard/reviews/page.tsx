import { Metadata } from "next";
import { format } from "date-fns";
import { ClientColumn } from "./components/columns";
import ReviewClient from "./components/client";
import { getAllReviews } from "@/actions/review";
import { enUS } from "date-fns/locale";

export const metadata: Metadata = {
  title: "Reviews",
  description: "Manage reviews for this site",
};

export default async function DashboardReviews() {
  const reviews = await getAllReviews();

  const formatted: ClientColumn[] = reviews?.length
    ? reviews.map((item) => ({
        id: item.id!,
        name: item.author.name ?? "NA",
        avatar: item.author.image || "/imgm/default.png",
        createdAt: item.createdAt
          ? `${format(item.createdAt, "PPP", { locale: enUS })}`
          : "NA",
        value: item.value,
        content: item.content,
        slug: item.post?.slug!,
      }))
    : [];

  return <ReviewClient data={formatted} />;
}
