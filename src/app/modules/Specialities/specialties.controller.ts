import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import status from "http-status";
import { SpecialitiesService } from "./specialties.service";

const getAllSpecialties = catchAsync(async (req: Request, res: Response) => {
  const result = await SpecialitiesService.getAllSpecialties();
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Specailties retreived successfully",
    data: result,
  });
});
const getSpecialtiesById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await SpecialitiesService.getSpecialtiesById(id);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Specailties retreived successfully",
    data: result,
  });
});

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await SpecialitiesService.insertIntoDB(req);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Specailties Created successfully",
    data: result,
  });
});

const updateIntoDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await SpecialitiesService.updateIntoDB(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Specailties data updated successfully",
    data: result,
  });
});

export const SpecialitiesController = {
  insertIntoDB,
  getAllSpecialties,
  getSpecialtiesById,
  updateIntoDB,
};
