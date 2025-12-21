import { Request, Response } from "express";
import { userService } from "./user.service";
import sendResponse from "../../../shared/sendResponse";
import status from "http-status";

const createAdmin = async (req: Request, res: Response) => {
  // console.log(req.file);
  const result = await userService.createAdmin(req);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Admin data created successfully",
    data: result,
  });
};

export const userController = {
  createAdmin,
};
