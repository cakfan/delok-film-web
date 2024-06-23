import { Cast, Country, People, User } from "@prisma/client";
import { z } from "zod";
import { GenderSchema } from "../user/gender";

export const PeopleSchema = z.object({
  id: z.string().optional(),
  name: z
    .string()
    .min(4, { message: "Name must be at least 4 characters" })
    .max(100, { message: "Its too long" }),
  slug: z
    .string()
    .min(1, { message: "Slug is required" })
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  bio: z.string().min(1, { message: "Bio must be not empty" }),
  gender: GenderSchema,
  avatar: z.union([z.string().nullable(), z.undefined()]),
  birthDate: z.date(),
  nativeName: z.union([z.string().nullable(), z.undefined()]),
  countryId: z.string().min(1, { message: "Nationality must be not empty" }),
});

export type PeopleFormValues = z.infer<typeof PeopleSchema>;

export interface PeopleWithAuthors extends People {
  authors: User[];
  nationality: Country;
}
