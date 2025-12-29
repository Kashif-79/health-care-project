import express, { NextFunction, Request, Response } from "express";
import { DoctorController } from "./doctor.controller";
import auth from "../../middleware/auth";
import { UserRole } from "@prisma/client";

const router = express.Router();

router.get("/", DoctorController.getAllDoctor);
router.get("/:id", DoctorController.getById);

router.patch(
  "/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  DoctorController.updateIntoDB
);

export const DoctorRoutes = router;
