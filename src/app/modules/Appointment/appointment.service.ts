import prisma from "../../../shared/prisma";
import { IAuthUser } from "../../interfaces/common";
import { v4 as uuidv4 } from "uuid";

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
  const doctorScheduleData = await prisma.doctorSchedules.findFirstOrThrow({
    where: {
      doctorId: doctorData.id,
      scheduleId: payLoad.scheduleId,
      isBooked: false,
    },
  });

  const videoCallingId = uuidv4();

  const result = await prisma.appointment.create({
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

  return result;
};

export const AppointmentService = {
  insertIntoDB,
};
