import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { ScheduleService } from "./schedule.service";
import sendResponse from "../../../shared/sendResponse";
import status from "http-status";
import pick from "../../../shared/pick";
import { IAuthUser } from "../../interfaces/common";

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await ScheduleService.insertIntoDB(req.body);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Schedule created successfully!",
    data: result,
  });
});
const getAllFromDB = catchAsync(
  async (req: Request & { user?: IAuthUser }, res: Response) => {
    const filters = pick(req.query, ["startDate", "endDate"]);
    const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);

    const user = req.user;
    const result = await ScheduleService.getAllFromDB(
      filters,
      options,
      user as IAuthUser,
    );

    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "Schedule retreived successfully!",
      data: result,
    });
  },
);

export const ScheduleController = {
  insertIntoDB,
  getAllFromDB,
};
