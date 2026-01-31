import express from "express";
import { ScheduleController } from "./schedule.controller";

import { UserRole } from "@prisma/client";
import auth from "../../middleware/auth";

const router = express.Router();

router.post(
  "/",
  auth(UserRole.DOCTOR, UserRole.ADMIN),
  ScheduleController.inserIntoDB,
);
router.get("/", auth(UserRole.DOCTOR), ScheduleController.getAllFromDB);
// router.get("/:id", auth(UserRole.DOCTOR), ScheduleController.getAllFromDB);

export const ScheduleRoutes = router;
