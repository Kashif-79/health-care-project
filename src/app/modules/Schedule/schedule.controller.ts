import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { ScheduleService } from "./schedule.service";
import sendResponse from "../../../shared/sendResponse";
import status from "http-status";
import pick from "../../../shared/pick";

const inserIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await ScheduleService.inserIntoDB(req.body);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Schedule created successfully!",
    data: result,
  });
});
const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, ["startDateTime", "endDateTime"]);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
  const result = await ScheduleService.getAllFromDB(filters, options);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Schedule retreived successfully!",
    data: result,
  });
});

export const ScheduleController = {
  inserIntoDB,
  getAllFromDB,
};
