import { MetadataRoute } from "next";
import { getAllPost } from "@/actions/post";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.HOMEPAGE_URL ?? "localhost:3000";
  const getAllPosts = await getAllPost({});

  const posts =
    getAllPosts?.map((post) => {
      return {
        url: `${baseUrl}/p/${post.slug}`,
        lastModified: post?.updatedAt,
      };
    }) ?? [];

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    ...posts,
  ];
}
