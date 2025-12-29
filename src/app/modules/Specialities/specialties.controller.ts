import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import status from "http-status";
import { SpecialitiesService } from "./specialties.service";

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await SpecialitiesService.insertIntoDB(req);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Specailties Created successfully",
    data: result,
  });
});

export const SpecialitiesController = {
  insertIntoDB,
};
