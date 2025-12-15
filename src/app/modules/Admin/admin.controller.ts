import { NextFunction, Request, Response } from "express";
import { AdminServices } from "./admin.service";
import pick from "../../../shared/pick";
import { adminFilterablesFields } from "./admin.constant";
import sendResponse from "../../../shared/sendResponse";
import status from "http-status";

const getAllAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const filters = pick(req.query, adminFilterablesFields);
    const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
    const result = await AdminServices.getAllAdminFromDB(filters, options);
    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "Admin data retrieved successfully",
      meta: result.meta,
      data: result.data,
    });
  } catch (err) {
    next(err);
  }
};

const getById = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {
    const result = await AdminServices.getByIdFromDB(id);
    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "Admin data retrieved successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const updateIntoDB = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const result = await AdminServices.updateIntoDB(id, req.body);
    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "Admin data updated successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const deleteFromDB = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const result = await AdminServices.deleteFromDB(id);
    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "Admin data deleted successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
const softDeleteFromDB = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const result = await AdminServices.softDeleteFromDB(id);
    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "Admin data deleted successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const AdminController = {
  getAllAdmin,
  getById,
  updateIntoDB,
  deleteFromDB,
  softDeleteFromDB,
};
