import { Request, Response } from "express";
import { userService } from "./user.service";
import sendResponse from "../../../shared/sendResponse";
import status from "http-status";

const createAdmin = async (req: Request, res: Response) => {
  const result = await userService.createAdmin(req);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Admin data created successfully",
    data: result,
  });
};
const createDoctor = async (req: Request, res: Response) => {
  const result = await userService.createDoctor(req);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Doctor data created successfully",
    data: result,
  });
};

export const userController = {
  createAdmin,
  createDoctor,
};
