import { Doctor, Patient, Prisma } from "@prisma/client";
import { paginationHelpar } from "../../../helpars/paginationHelper";
import { IPaginationOptions } from "../../interfaces/pagination";
import prisma from "../../../shared/prisma";
import { IPatientFilterRequest } from "./patient.interface";
import { patientSearchAbleFields } from "./patient.constant";

const getAllPatientFromDB = async (
  params: IPatientFilterRequest,
  options: IPaginationOptions
) => {
  const { page, limit, skip } = paginationHelpar.calculatePagination(options);
  const { searchTerm, ...filterData } = params;
  const andCondition: Prisma.PatientWhereInput[] = [];

  if (searchTerm) {
    andCondition.push({
      OR: patientSearchAbleFields.map((field) => ({
        [field]: {
          contains: searchTerm,
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

  const whereCondition: Prisma.PatientWhereInput =
    andCondition.length > 0 ? { AND: andCondition } : {};

  const result = await prisma.patient.findMany({
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
    include: {
      medicalReport: true,
      patientHeathData: true,
    },
  });
  const total = await prisma.patient.count({
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

const getByIdFromDB = async (id: string): Promise<Patient | null> => {
  const result = await prisma.patient.findUnique({
    where: {
      id,
      isDeleted: false,
    },
    include: {
      patientHeathData: true,
      medicalReport: true,
    },
  });

  return result;
};

const updateIntoDB = async (id: string, payLoad: any) => {
  await prisma.patient.findFirstOrThrow({
    where: {
      id,
    },
  });

  const result = await prisma.patient.update({
    where: {
      id,
    },
    data: payLoad,
  });

  return result;
};

export const PatientServices = {
  getAllPatientFromDB,
  getByIdFromDB,
  updateIntoDB,
};
