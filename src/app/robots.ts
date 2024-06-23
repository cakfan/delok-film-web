import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.HOMEPAGE_URL ?? "localhost:3000";
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/p", "/people", "/category", "/search"],
      disallow: ["/setup", "/dasboard"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
