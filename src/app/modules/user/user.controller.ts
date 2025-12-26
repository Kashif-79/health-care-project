import { Request, Response } from "express";
import { userService } from "./user.service";
import sendResponse from "../../../shared/sendResponse";
import status from "http-status";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import { userFilterAbleFields } from "./user.constant";

const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.createAdmin(req);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Admin data created successfully",
    data: result,
  });
});
const createDoctor = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.createDoctor(req);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Doctor data created successfully",
    data: result,
  });
});
const createPatient = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.createPatient(req);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Patient data created successfully",
    data: result,
  });
});

const getAllUser = catchAsync(async (req, res) => {
  const filters = pick(req.query, userFilterAbleFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
  const result = await userService.getAllUserFromDB(filters, options);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "User data retrieved successfully",
    meta: result.meta,
    data: result.data,
  });
});

const changeProfileStatus = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await userService.changeProfileStatus(id as string, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Status Updated successfully",
    data: result,
  });
});

const getMyProfile = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  // console.log(user);

  const result = await userService.getMyProfile(user);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "My Profile retreived SuccessFully",
    data: result,
  });
});
const updateMyProfile = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;

  const result = await userService.updateMyProfile(user, req);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "My Profile Updated SuccessFully",
    data: result,
  });
});

export const userController = {
  createAdmin,
  createDoctor,
  createPatient,
  getAllUser,
  changeProfileStatus,
  getMyProfile,
  updateMyProfile,
};
