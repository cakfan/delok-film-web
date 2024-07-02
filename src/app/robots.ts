import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.HOMEPAGE_URL ?? "localhost:3000";
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/p", "/country", "/category", "/search"],
      disallow: ["/setup", "/dashboard"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
