import express, { NextFunction, Request, Response } from "express";
import { userController } from "./user.controller";
import { jwtHelper } from "../../../helpars/jwtHelper";
import config from "../../../config";
import { Secret } from "jsonwebtoken";

const router = express.Router();

const auth = (...roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;
      if (!token) {
        throw new Error("You are not authorized");
      }

      const verifiedUser = jwtHelper.verifyToken(
        token,
        config.jwt.jwt_secret as Secret
      );
      if (roles.length && !roles.includes(verifiedUser.role)) {
        throw new Error("You are not authorized");
      }
    } catch (err) {
      next(err);
    }
  };
};

router.post("/", auth("ADMIN", "SUPER_ADMIN"), userController.createAdmin);

export const userRoutes = router;
