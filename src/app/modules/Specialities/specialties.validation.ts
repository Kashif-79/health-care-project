import z from "zod";

const create = z.object({
  title: z.string().min(1, "title is required"),
});

export const SpecailtiesValidation = {
  create,
};
