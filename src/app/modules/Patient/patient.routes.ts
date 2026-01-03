import express, { NextFunction, Request, Response } from "express";
import { PatientController } from "./patient.controller";

const router = express.Router();

router.get("/", PatientController.getAllPatient);
router.get("/:id", PatientController.getById);
router.patch("/:id", PatientController.updateIntoDB);

export const PatientRoutes = router;
