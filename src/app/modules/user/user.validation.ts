import z from "zod";

const createAdmin = z.object({
  password: z.string(),
  admin: z.object({
    name: z.string(),
    email: z.string(),
    contactNumber: z.string(),
  }),
});

export const UserValidation = {
  createAdmin,
};
