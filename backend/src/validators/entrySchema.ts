import { z } from "zod";

export const createEntrySchema = z.object({
  title: z.string().min(1),
  type: z.enum(["Movie", "TV Show"]),
  director: z.string().min(1),
  budget: z.number().optional(),
  location: z.string().optional(),
  duration: z.string().optional(),
  yearOrTime: z.number().int().optional(),
  picture: z.url().optional(),
});

export const updateEntrySchema = createEntrySchema.partial();

export type CreateEntryInput = z.infer<typeof createEntrySchema>;
export type UpdateEntryInput = z.infer<typeof updateEntrySchema>;
