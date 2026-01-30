import prisma from "../../../shared/prisma";
import { IAuthUser } from "../../interfaces/common";

const inserIntoDB = async (
  user: IAuthUser,
  payload: {
    scheduleIds: string[];
  },
) => {
  const doctorData = await prisma.doctor.findUniqueOrThrow({
    where: {
      email: user.email,
    },
  });
  const doctorScheduleData = payload.scheduleIds.map((scheduleId) => ({
    doctorId: doctorData.id,
    scheduleId,
  }));
  const result = await prisma.doctorSchedules.createMany({
    data: doctorScheduleData,
  });

  return result;
};

export const DoctorScheduleService = {
  inserIntoDB,
};
