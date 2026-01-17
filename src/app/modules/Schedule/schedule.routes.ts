import express from "express";
import { ScheduleController } from "./schedule.controller";

import { UserRole } from "@prisma/client";
import auth from "../../middleware/auth";

const router = express.Router();

router.post(
  "/",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  ScheduleController.inserIntoDB,
);

export const ScheduleRoutes = router;
