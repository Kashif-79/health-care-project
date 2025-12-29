import express, { NextFunction, Request, Response } from "express";
import { SpecialitiesController } from "./specialties.controller";
import { fileUploader } from "../../../helpars/fileUploader";
import { SpecailtiesValidation } from "./specialties.validation";

const router = express.Router();

router.get("/", SpecialitiesController.getAllSpecialties);
router.get("/:id", SpecialitiesController.getSpecialtiesById);

router.post(
  "/create-specialties",
  fileUploader.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = SpecailtiesValidation.create.parse(JSON.parse(req.body.data));
    return SpecialitiesController.insertIntoDB(req, res, next);
  }
);

export const SpecialitiesRoutes = router;
