import { Cast, Category, Country, Movie, Post, User } from "@prisma/client";
import { z } from "zod";

export const MovieSchema = z.object({
  id: z.union([z.string(), z.undefined()]),
  title: z
    .string()
    .min(4, { message: "Title must be at least 4 characters" })
    .max(100, { message: "It's too long" }),
  slug: z
    .string()
    .min(1, { message: "Slug is required" })
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  content: z.string().min(1, { message: "Content must be not empty" }),
  status: z.string().refine(
    (val) => {
      return val === "draft" || val === "pending" || val === "public";
    },
    {
      message: "Status must be either 'draft', 'pending' or 'public'",
    },
  ),
  type: z.string().refine(
    (val) => {
      return val === "movie" || val === "drama";
    },
    {
      message: "Type must be either 'movie' or 'drama'",
    },
  ),
  nativeTitle: z.union([z.string().nullable(), z.undefined()]),
  movie: z.union([
    z
      .object({
        id: z.union([z.string(), z.undefined()]),
        poster: z.union([z.string().nullable(), z.undefined()]),
        director: z.string().min(1, { message: "Director must be not empty" }),
        trailer: z.union([z.string().nullable(), z.undefined()]),
        contentRating: z.union([z.string().nullable(), z.undefined()]),
        screenWriter: z.union([z.string().nullable(), z.undefined()]),
        releaseDate: z.union([z.date().nullable(), z.undefined()]),
        categories: z.union([
          z
            .object({
              id: z.string(),
              name: z.union([z.string().nullable(), z.undefined()]),
              slug: z.union([z.string().nullable(), z.undefined()]),
            })
            .array()
            .nullable(),
          z.undefined(),
        ]),
        countries: z.union([
          z
            .object({
              id: z.string(),
              name: z.union([z.string().nullable(), z.undefined()]),
              slug: z.union([z.string().nullable(), z.undefined()]),
            })
            .array()
            .nullable(),
          z.undefined(),
        ]),
        casts: z.union([
          z
            .object({
              id: z.union([z.string().nullable(), z.undefined()]),
              peopleId: z
                .string()
                .min(1, { message: "People id must be not empty" }),
              characterName: z.union([z.string().nullable(), z.undefined()]),
              people: z.object({
                name: z.union([z.string().nullable(), z.undefined()]),
                avatar: z.union([z.string().nullable(), z.undefined()]),
                slug: z.union([z.string().nullable(), z.undefined()]),
              }),
            })
            .array()
            .nullable(),
          z.undefined(),
        ]),
      })
      .nullable(),
    z.undefined(),
  ]),
});

export type MovieFormValues = z.infer<typeof MovieSchema>;

export interface PostWithMovieAndCountries extends Post {
  movie?: (Movie & { countries?: Country[] | null }) | null;
}

export interface PostWithMovieDetail extends MovieFormValues {
  authors?: User[] | null;
}
