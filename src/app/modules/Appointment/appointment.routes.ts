import express from "express";
import { AppointmentController } from "./appointment.controller";
import auth from "../../middleware/auth";
import { UserRole } from "@prisma/client";

const router = express.Router();

router.post("/", auth(UserRole.PATIENT), AppointmentController.insertIntoDB);

export const AppointmentRoutes = router;
