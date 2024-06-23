import { MetadataRoute } from "next";
import { getAllPost } from "@/actions/post";
import { getAllPeoples } from "@/actions/people";
import { getAllUsers } from "@/actions/user";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.HOMEPAGE_URL ?? "localhost:3000";
  const getPosts = await getAllPost({});
  const getPeoples = await getAllPeoples();
  const getUsers = await getAllUsers();

  const posts =
    getPosts?.map((post) => {
      return {
        url: `${baseUrl}/p/${post.slug}`,
        lastModified: post?.updatedAt,
      };
    }) ?? [];

  const peoples =
    getPeoples?.map((people) => {
      return {
        url: `${baseUrl}/people/${people.slug}`,
        lastModified: people.updatedAt,
      };
    }) ?? [];

  const users =
    getUsers?.map((user) => {
      return {
        url: `${baseUrl}/@${user.username}`,
      };
    }) ?? [];

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/signin`,
    },
    {
      url: `${baseUrl}/search`,
    },
    {
      url: `${baseUrl}/category`,
    },
    ...posts,
    ...peoples,
    ...users,
  ];
}
