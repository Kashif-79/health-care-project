import status from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { AppointmentService } from "./appointment.service";
import { Request, Response } from "express";
import { IAuthUser } from "../../interfaces/common";
import pick from "../../../shared/pick";

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
      message: "Appointment data created successfully",
      data: result,
    });
  },
);
const getMyAppointment = catchAsync(
  async (req: Request & { user?: IAuthUser }, res: Response) => {
    const user = req.user;
    const filters = pick(req.query, ["status", "paymentStatus"]);
    const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
    const result = await AppointmentService.getMyAppointment(
      user as IAuthUser,
      filters,
      options,
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
  getMyAppointment,
};
