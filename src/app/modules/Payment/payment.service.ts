import axios from "axios";
import prisma from "../../../shared/prisma";
import { SSLService } from "../SSL/ssc.service";
import config from "../../../config";
import { PaymentStatus } from "@prisma/client";

const initPayment = async (appointmentId: string) => {
  const paymentData = await prisma.payment.findFirstOrThrow({
    where: {
      appointmentId,
    },
    include: {
      appointment: {
        include: {
          patient: true,
        },
      },
    },
  });

  const initPaymentData = {
    amount: paymentData.amount,
    transactionId: paymentData.transactionId,
    name: paymentData.appointment.patient.name,
    email: paymentData.appointment.patient.email,
    address: paymentData.appointment.patient.address,
    phoneNumber: paymentData.appointment.patient.contactNumber,
  };

  const result = await SSLService.initPayment(initPaymentData);
  return {
    paymentUrl: result,
  };
};

const validatePayment = async (payLoad: any) => {
  if (!payLoad || !payLoad.status || !(payLoad.status === "VALID")) {
    return {
      message: "Invalide Payment",
    };
  }

  const response = await SSLService.validatePaymet(payLoad);

  if (response.status === "VALID") {
    return {
      message: "Payment Failed",
    };
  }

  await prisma.$transaction(async (tx) => {
    const updatePaymentData = tx.payment.updateMany({
      where: {
        transactionId: response.tran_id,
      },
      data: {
        status: PaymentStatus.PAID,
        paymentGateWayData: response,
      },
    });

    //    await tx.appointment.update({
    //   where:{

    //   }
    // })
  });
};

export const PaymentService = {
  initPayment,
  validatePayment,
};
