import { Request, RequestHandler, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import status from "http-status";
import { patientFilterablesFields } from "./patient.constant";
import { PatientServices } from "./patient.service";

const getAllPatient: RequestHandler = catchAsync(async (req, res) => {
  const filters = pick(req.query, patientFilterablesFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
  const result = await PatientServices.getAllPatientFromDB(filters, options);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Patient data retrieved successfully",
    meta: result.meta,
    data: result.data,
  });
});

const getById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await PatientServices.getByIdFromDB(id);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Patient data retrieved successfully",
    data: result,
  });
});

const updateIntoDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await PatientServices.updateIntoDB(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Patient data updated successfully",
    data: result,
  });
});

export const PatientController = {
  getAllPatient,
  getById,
  updateIntoDB,
};
