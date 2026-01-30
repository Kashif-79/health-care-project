import { addHours, addMinutes, format } from "date-fns";
import prisma from "../../../shared/prisma";
import { IFilterRequest, ISchedule } from "./schedule.interface";
import { IPaginationOptions } from "../../interfaces/pagination";
import { paginationHelpar } from "../../../helpars/paginationHelper";
import { Prisma } from "@prisma/client";
import { IAuthUser } from "../../interfaces/common";

const inserIntoDB = async (payload: ISchedule) => {
  const { startDate, endDate, startTime, endTime } = payload;

  const interverlTime = 30;

  const schedules = [];

  const currentDate = new Date(startDate);
  const lastDate = new Date(endDate);

  while (currentDate <= lastDate) {
    const startDateTime = new Date(
      addMinutes(
        addHours(
          `${format(currentDate, "yyyy-MM-dd")}`,
          Number(startTime.split(":")[0]),
        ),
        Number(startTime.split(":")[1]),
      ),
    );

    const endDateTime = new Date(
      addMinutes(
        addHours(
          `${format(currentDate, "yyyy-MM-dd")}`,
          Number(endTime.split(":")[0]),
        ),
        Number(endTime.split(":")[1]),
      ),
    );

    while (startDateTime < endDateTime) {
      const scheduleData = {
        startDateTime: startDateTime,
        endDateTime: addMinutes(startDateTime, interverlTime),
      };

      const existingSchedule = await prisma.schedule.findFirst({
        where: {
          startDateTime: scheduleData.startDateTime,
          endDateTime: scheduleData.endDateTime,
        },
      });

      if (!existingSchedule) {
        const result = await prisma.schedule.create({
          data: scheduleData,
        });
        schedules.push(result);
      }

      startDateTime.setMinutes(startDateTime.getMinutes() + interverlTime);
    }

    currentDate.setDate(currentDate.getDate() + 1);
  }

  return schedules;
};

const getAllFromDB = async (
  params: IFilterRequest,
  options: IPaginationOptions,
  user: IAuthUser,
) => {
  const { page, limit, skip } = paginationHelpar.calculatePagination(options);
  const { startDate, endDate, ...filterData } = params;
  const andCondition: Prisma.ScheduleWhereInput[] = [];

  if (startDate && endDate) {
    andCondition.push({
      AND: [
        {
          startDateTime: {
            gte: startDate,
          },
        },
        {
          endDateTime: {
            lte: endDate,
          },
        },
      ],
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

  const whereCondition: Prisma.ScheduleWhereInput =
    andCondition.length > 0 ? { AND: andCondition } : {};

  const doctorSchedules = await prisma.doctorSchedules.findMany({
    where: {
      doctor: {
        email: user?.email,
      },
    },
  });

  const doctorScheduleIds = doctorSchedules.map(
    (schedule) => schedule.scheduleId,
  );

  const result = await prisma.schedule.findMany({
    where: {
      ...whereCondition,
      id: {
        notIn: doctorScheduleIds,
      },
    },
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
  });
  const total = await prisma.schedule.count({
    where: {
      ...whereCondition,
      id: {
        notIn: doctorScheduleIds,
      },
    },
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

export const ScheduleService = {
  inserIntoDB,
  getAllFromDB,
};
