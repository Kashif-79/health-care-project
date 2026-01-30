import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import status from "http-status";
import { DoctorScheduleService } from "./doctorSchedule.service";
import { IAuthUser } from "../../interfaces/common";
import pick from "../../../shared/pick";

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

const getMySchedule = catchAsync(
  async (req: Request & { user?: IAuthUser }, res: Response) => {
    const filters = pick(req.query, ["startDate", "endDate", "isBooked"]);
    const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);

    const user = req.user;
    const result = await DoctorScheduleService.getMySchedule(
      filters,
      options,
      user as IAuthUser,
    );

    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "My Schedule retreived successfully!",
      data: result,
    });
  },
);

const deleteFromDB = catchAsync(
  async (req: Request & { user?: IAuthUser }, res: Response) => {
    const user = req.user;
    const { id } = req.params;
    const result = await DoctorScheduleService.deleteFromDB(
      user as IAuthUser,
      id as string,
    );

    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "My Schedule deleted successfully!",
      data: result,
    });
  },
);

export const DoctorScheduleController = {
  inserIntoDB,
  getMySchedule,
  deleteFromDB,
};
