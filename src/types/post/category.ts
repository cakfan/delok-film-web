import { z } from "zod";

export const CategorySchema = z.object({
  id: z.string().optional(),
  name: z.string().min(4, { message: "Name must be at least 4 characters" }),
  slug: z
    .string()
    .min(1, { message: "Slug is required" })
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
});

export type CategoryFormValues = z.infer<typeof CategorySchema>;
