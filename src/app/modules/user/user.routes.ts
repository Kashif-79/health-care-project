import express from "express";
import { userController } from "./user.controller";
import auth from "../../middleware/auth";
import { UserRole } from "@prisma/client";
import { fileUploader } from "../../../helpars/fileUploader";

const router = express.Router();

router.post(
  "/",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  fileUploader.upload.single("file"),
  userController.createAdmin
);

export const userRoutes = router;
