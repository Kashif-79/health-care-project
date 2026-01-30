import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import status from "http-status";
import { DoctorScheduleService } from "./doctorSchedule.service";
import { IAuthUser } from "../../interfaces/common";

const inserIntoDB = catchAsync(
  async (req: Request & { user?: IAuthUser }, res: Response) => {
    const user = req.user;
    const result = await DoctorScheduleService.inserIntoDB(
      user as IAuthUser,
      req.body,
    );

    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "Doctor Schedule created successfully!",
      data: result,
    });
  },
);

export const DoctorScheduleController = {
  inserIntoDB,
};
