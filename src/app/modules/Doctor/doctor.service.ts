import { Doctor, Prisma } from "@prisma/client";
import { paginationHelpar } from "../../../helpars/paginationHelper";
import { IPaginationOptions } from "../../interfaces/pagination";
import { IDoctorFilterRequest } from "./doctor.interface";
import { doctorSearchAbleFields } from "./doctor.constant";
import prisma from "../../../shared/prisma";

const getAllDoctorFromDB = async (
  params: IDoctorFilterRequest,
  options: IPaginationOptions
) => {
  const { page, limit, skip } = paginationHelpar.calculatePagination(options);
  const { searchTerm, ...filterData } = params;
  const andCondition: Prisma.DoctorWhereInput[] = [];

  if (params.searchTerm) {
    andCondition.push({
      OR: doctorSearchAbleFields.map((field) => ({
        [field]: {
          contains: params.searchTerm,
          mode: "insensitive",
        },
      })),
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

  andCondition.push({
    isDeleted: false,
  });

  const whereCondition: Prisma.DoctorWhereInput = { AND: andCondition };

  const result = await prisma.doctor.findMany({
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
  });
  const total = await prisma.doctor.count({
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

const getByIdFromDB = async (id: string): Promise<Doctor | null> => {
  const result = await prisma.doctor.findUnique({
    where: {
      id,
      isDeleted: false,
    },
  });

  return result;
};

export const DoctorServices = {
  getAllDoctorFromDB,
  getByIdFromDB,
};
