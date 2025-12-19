import express from "express";
import { AuthController } from "./auth.controller";
import auth from "../../middleware/auth";
import { UserRole } from "@prisma/client";

const router = express.Router();

router.post("/login", AuthController.loginUser);
router.post(
  "/refresh-token",

  AuthController.refreshToken
);
router.post(
  "/change-password",
  auth(UserRole.ADMIN, UserRole.DOCTOR, UserRole.SUPER_ADMIN, UserRole.PATIENT),
  AuthController.changePassword
);
router.post(
  "/forgot-password",
  // auth(UserRole.ADMIN, UserRole.DOCTOR, UserRole.SUPER_ADMIN, UserRole.PATIENT),
  AuthController.forgotPassword
);

export const AuthRoutes = router;
