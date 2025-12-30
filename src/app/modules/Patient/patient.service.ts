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
  });

  return result;
};

// const updateIntoDB = async (id: string, payLoad: any) => {
//   const { specialties, ...doctorData } = payLoad;
//   // console.log("Spe: ", specialties, "Doc: ", doctorData);
//   const doctorInfo = await prisma.doctor.findUniqueOrThrow({
//     where: {
//       id,
//     },
//   });

//   await prisma.$transaction(async (transactionClient) => {
//     const updatedDoctorData = await transactionClient.doctor.update({
//       where: {
//         id,
//       },
//       data: doctorData,
//       include: {
//         doctorSpecialties: true,
//       },
//     });

//     if (specialties && specialties.length > 0) {
//       // delete specilties
//       const deleteSpecialtiesIds = specialties.filter(
//         (specialty) => specialty.isDeleted
//       );

//       for (const specialty of deleteSpecialtiesIds) {
//         await transactionClient.doctorSpecialties.deleteMany({
//           where: {
//             doctorId: doctorInfo.id,
//             specialtiesId: specialty.specialtiesId,
//           },
//         });
//       }
//       // create
//       const createSpecialtiesIds = specialties.filter(
//         (specialty) => !specialty.isDeleted
//       );

//       for (const specialty of createSpecialtiesIds) {
//         await transactionClient.doctorSpecialties.create({
//           data: {
//             doctorId: doctorInfo.id,
//             specialtiesId: specialty.specialtiesId,
//           },
//         });
//       }
//     }
//   });

//   const result = await prisma.doctor.findUnique({
//     where: {
//       id: doctorInfo.id,
//     },
//     include: {
//       doctorSpecialties: {
//         include: {
//           specialties: true,
//         },
//       },
//     },
//   });

//   return result;
// };

export const PatientServices = {
  getAllPatientFromDB,
  getByIdFromDB,
  //   updateIntoDB,
};
