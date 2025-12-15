import { Request, Response } from "express";
import { AdminServices } from "./admin.service";
import pick from "../../../shared/pick";
import { adminFilterablesFields } from "./admin.constant";

const getAllAdmin = async (req: Request, res: Response) => {
  try {
    const filters = pick(req.query, adminFilterablesFields);
    const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
    const result = await AdminServices.getAllAdminFromDB(filters, options);
    res.status(200).json({
      success: true,
      message: "Admin data retreived Successfully",
      meta: result.meta,
      data: result.data,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err?.name || "Something went wrong",
      error: err,
    });
  }
};

const getById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await AdminServices.getByIdFromDB(id);
    res.status(200).json({
      success: true,
      message: "Admin data retreived Successfully",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err?.name || "Something went wrong",
      error: err,
    });
  }
};

const updateIntoDB = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await AdminServices.updateIntoDB(id, req.body);
    res.status(200).json({
      success: true,
      message: "Admin data updated Successfully",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err?.name || "Something went wrong",
      error: err,
    });
  }
};

const deleteFromDB = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await AdminServices.deleteFromDB(id);
    res.status(200).json({
      success: true,
      message: "Admin data deleted Successfully",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err?.name || "Something went wrong",
      error: err,
    });
  }
};
const softDeleteFromDB = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await AdminServices.softDeleteFromDB(id);
    res.status(200).json({
      success: true,
      message: "Admin data deleted Successfully",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err?.name || "Something went wrong",
      error: err,
    });
  }
};

export const AdminController = {
  getAllAdmin,
  getById,
  updateIntoDB,
  deleteFromDB,
  softDeleteFromDB,
};
