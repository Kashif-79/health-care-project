import express from "express";
import { AppointmentController } from "./appointment.controller";
import auth from "../../middleware/auth";
import { UserRole } from "@prisma/client";

const router = express.Router();

router.post("/", auth(UserRole.PATIENT), AppointmentController.insertIntoDB);
router.get(
  "/my-appointment",
  auth(UserRole.PATIENT, UserRole.DOCTOR),
  AppointmentController.getMyAppointment,
);

export const AppointmentRoutes = router;
