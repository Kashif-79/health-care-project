import { BloodGroup, Gender,  } from "@prisma/client";
import z from "zod";

const createAdmin = z.object({
  password: z.string().min(1, "Password is required"),
  admin: z.object({
    name: z.string().min(1, "Admin name is required"),
    email: z.string().min(1, "Email is required"),
    contactNumber: z.string().min(1, "Contact number is required"),
  }),
});

const createDoctor = z.object({
  password: z.string().min(1, "Password is required"),
  doctor: z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().min(1, "Email is required"),
    contactNumber: z.string().min(1, "Contact number is required"),
    address: z.string().optional(),
    registrationNumber: z.string().min(1, "Registration number is required"),
    experience: z.number().min(0).optional(),
    gender: z.enum([Gender.FEMALE, Gender.MALE]),
    appointmentFee: z
      .number()
      .min(0, "Appointment fee must be a positive number"),
    qualification: z.string().min(1, "Qualification is required"),
    currentWorkingPlace: z.string().min(1, "Current working place is required"),
    designation: z.string().min(1, "Designation is required"),
  }),
});
const createPatient = z.object({
  password: z.string().min(1, "Password is required"),
  patient: z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().min(1, "Email is required"),
    contactNumber: z.string().min(1, "Contact number is required"),
    address: z.string().optional(),
    age: z
      .number()
      .min(0, "Age must be a positive number"),
    gender: z.enum([Gender.FEMALE, Gender.MALE]),
    bloodGroup: z
      .enum([
        BloodGroup.A_POS,
        BloodGroup.A_NEG,
        BloodGroup.B_POS,
        BloodGroup.B_NEG,
        BloodGroup.AB_POS,
        BloodGroup.AB_NEG,
        BloodGroup.O_POS,
        BloodGroup.O_NEG,
      ])
      .optional(),
  }),
});

export const UserValidation = {
  createAdmin,
  createDoctor,
  createPatient
};
