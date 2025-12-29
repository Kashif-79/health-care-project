import z from "zod";

const create = z.object({
  title: z.string().min(1, "title is required"),
});
const update = z.object({
  title: z.string().min(1, "title is required").optional(),
});

export const SpecailtiesValidation = {
  create,
  update,
};
