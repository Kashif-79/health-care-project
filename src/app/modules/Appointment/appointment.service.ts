import prisma from "../../../shared/prisma";
import { IAuthUser } from "../../interfaces/common";
import { v4 as uuidv4 } from "uuid";
import { IPaginationOptions } from "../../interfaces/pagination";
import { paginationHelpar } from "../../../helpars/paginationHelper";
import { Prisma, UserRole } from "@prisma/client";

const insertIntoDB = async (user: IAuthUser, payLoad: any) => {
  const patientData = await prisma.patient.findFirstOrThrow({
    where: {
      email: user.email,
    },
  });
  const doctorData = await prisma.doctor.findFirstOrThrow({
    where: {
      id: payLoad.doctorId,
    },
  });

  const doctorSchedulesData = await prisma.doctorSchedules.findFirstOrThrow({
    where: {
      doctorId: doctorData.id,
      scheduleId: payLoad.scheduleId,
      isBooked: false,
    },
  });

  const videoCallingId: string = uuidv4();

  const result = await prisma.$transaction(async (tx) => {
    const appointmentData = await tx.appointment.create({
      data: {
        patientId: patientData.id,
        doctorId: doctorData.id,
        scheduleId: payLoad.scheduleId,
        videoCallingId,
      },
      include: {
        patient: true,
        doctor: true,
        schedule: true,
      },
    });

    await tx.doctorSchedules.update({
      where: {
        doctorId_scheduleId: {
          doctorId: doctorData.id,
          scheduleId: payLoad.scheduleId,
        },
      },
      data: {
        isBooked: true,
        appointmentId: appointmentData.id,
      },
    });

    const today = new Date();
    const transactionId =
      "Health_care-" +
      today.getFullYear() +
      "-" +
      today.getMonth() +
      "-" +
      today.getHours() +
      "-" +
      today.getMinutes();

    await tx.payment.create({
      data: {
        appointmentId: appointmentData.id,
        amount: doctorData.appointmentFee,
        transactionId,
      },
    });

    return appointmentData;
  });

  return result;
};

const getMyAppointment = async (
  user: IAuthUser,
  filters: any,
  options: IPaginationOptions,
) => {
  const { page, limit, skip } = paginationHelpar.calculatePagination(options);
  const { ...filterData } = filters;
  const andCondition: Prisma.AppointmentWhereInput[] = [];

  if (user?.role === UserRole.PATIENT) {
    andCondition.push({
      patient: {
        email: user?.email,
      },
    });
  } else if (user?.role === UserRole.DOCTOR) {
    andCondition.push({
      doctor: {
        email: user?.email,
      },
    });
  }

  if (Object.keys(filterData).length > 0) {
    andCondition.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }

  const whereCondition: Prisma.AppointmentWhereInput =
    andCondition.length > 0 ? { AND: andCondition } : {};

  const result = await prisma.appointment.findMany({
    where: whereCondition,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            createdAt: "desc",
          },
    include:
      user?.role === UserRole.PATIENT
        ? { doctor: true, schedule: true }
        : {
            patient: {
              include: {
                medicalReport: true,
                patientHeathData: true,
              },
            },
            schedule: true,
          },
  });
  const total = await prisma.appointment.count({
    where: whereCondition,
  });
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

export const AppointmentService = {
  insertIntoDB,
  getMyAppointment,
};
