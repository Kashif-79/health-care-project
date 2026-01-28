import express from "express";
import { DoctorScheduleController } from "./doctorSchedule.controller";
import auth from "../../middleware/auth";
import { UserRole } from "@prisma/client";

const router = express.Router();

router.post("/", auth(UserRole.DOCTOR), DoctorScheduleController.inserIntoDB);

export const DoctorScheduleRoutes = router;
