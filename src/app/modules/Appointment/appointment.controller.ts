import status from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { AppointmentService } from "./appointment.service";
import { Request, Response } from "express";
import { IAuthUser } from "../../interfaces/common";

const insertIntoDB = catchAsync(
  async (req: Request & { user?: IAuthUser }, res: Response) => {
    const user = req.user;
    const result = await AppointmentService.insertIntoDB(
      user as IAuthUser,
      req.body,
    );
    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "Doctor data retrieved successfully",
      data: result,
    });
  },
);

export const AppointmentController = {
  insertIntoDB,
};
