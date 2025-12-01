import { Request, Response } from "express";
import { AdminServices } from "./admin.service";

const getAllAdmin = async (req: Request, res: Response) => {
  try {
    const result = await AdminServices.getAllAdmin();

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
export const AdminController = {
  getAllAdmin,
};
