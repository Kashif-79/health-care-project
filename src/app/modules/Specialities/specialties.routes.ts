import express, { NextFunction, Request, Response } from "express";
import { SpecialitiesController } from "./specialties.controller";
import { fileUploader } from "../../../helpars/fileUploader";
import { SpecailtiesValidation } from "./specialties.validation";
import auth from "../../middleware/auth";
import { UserRole } from "@prisma/client";
import validateRequest from "../../middleware/validateRequest";

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

router.patch(
  "/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  validateRequest(SpecailtiesValidation.update),
  SpecialitiesController.updateIntoDB
);

export const SpecialitiesRoutes = router;
