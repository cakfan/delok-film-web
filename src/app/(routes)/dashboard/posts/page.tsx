import { Metadata } from "next";
import { format } from "date-fns";
import { ClientColumn } from "./components/columns";
import PostClient from "./components/client";
import { enUS } from "date-fns/locale";
import { getMe } from "@/actions/user";
import { getAllPost, getPostsByAuthor } from "@/actions/post";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Posts",
  description: "Manage posts for this site",
};

export default async function DashboardPeoples() {
  const me = await getMe();
  if (!me || !me.username) redirect("/");
  const isAdmin = me?.role === "admin";

  const posts = isAdmin
    ? await getAllPost({})
    : await getPostsByAuthor({ username: me?.username! });

  const formatted: ClientColumn[] = posts
    ? posts.map((item) => ({
        id: item.id!,
        title: item.title,
        slug: item.slug,
        type: item.type,
        status: item.status,
        poster: item.poster || "/img/default.png",
        updatedAt:
          format(item.updatedAt, "PPP", {
            locale: enUS,
          }) ?? "NA",
        country: item.countries?.[0].name ?? "NA",
      }))
    : [];

  return <PostClient data={formatted} />;
}
