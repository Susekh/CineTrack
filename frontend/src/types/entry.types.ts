import { z } from "zod";

export const entrySchema = z.object({
  title: z.string().min(2, "Title is required"),
  type: z.enum(["MOVIE", "TV_SHOW"]).refine((val) => !!val, {
    message: "Select a type",
  }),
  director: z.string().min(2, "Director is required"),
  budget: z.number().positive("Budget must be positive"),
  location: z.string().min(2, "Location is required"),
  duration: z.string().min(1, "Duration is required"),
  yearOrTime: z.date("Invalid date").optional(),
  picture: z.string().url("Must be a valid image URL").optional().or(z.literal("")),
});

export type EntrySchemaType = z.infer<typeof entrySchema>;