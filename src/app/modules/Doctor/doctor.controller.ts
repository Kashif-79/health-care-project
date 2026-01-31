import { Request, RequestHandler, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import { doctorFilterablesFields } from "./doctor.constant";
import sendResponse from "../../../shared/sendResponse";
import status from "http-status";
import { DoctorServices } from "./doctor.service";

const getAllDoctor: RequestHandler = catchAsync(async (req, res) => {
  const filters = pick(req.query, doctorFilterablesFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
  const result = await DoctorServices.getAllDoctorFromDB(filters, options);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Doctor data retrieved successfully",
    meta: result.meta,
    data: result.data,
  });
});

const getById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await DoctorServices.getByIdFromDB(id as string);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Doctor data retrieved successfully",
    data: result,
  });
});

const updateIntoDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await DoctorServices.updateIntoDB(id as string, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Specailties data updated successfully",
    data: result,
  });
});

export const DoctorController = {
  getAllDoctor,
  getById,
  updateIntoDB,
};
