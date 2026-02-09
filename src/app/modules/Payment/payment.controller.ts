import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { PaymentService } from "./payment.service";
import sendResponse from "../../../shared/sendResponse";
import status from "http-status";

const initPayment = catchAsync(async (req: Request, res: Response) => {
  const { appointmentId } = req.params;
  const result = await PaymentService.initPayment(appointmentId as string);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Payment initiate successfully",
    data: result,
  });
});
const validatePayment = catchAsync(async (req: Request, res: Response) => {
  const result = await PaymentService.validatePayment(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Payment Validated successfully",
    data: result,
  });
});
export const PaymentController = {
  initPayment,
  validatePayment,
};
