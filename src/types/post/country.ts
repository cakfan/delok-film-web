import { z } from "zod";

export const CountrySchema = z.object({
  id: z.string().optional(),
  name: z.string().min(4, { message: "Name must be at least 4 characters" }),
  slug: z
    .string()
    .min(1, { message: "Slug is required" })
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
});

export type CountryFormValues = z.infer<typeof CountrySchema>;

export type CountryWithFlag = {
  id: string;
  name: string;
  icon?: React.ReactNode | null;
};
