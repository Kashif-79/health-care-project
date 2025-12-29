import { Request } from "express";
import { fileUploader } from "../../../helpars/fileUploader";
import prisma from "../../../shared/prisma";
import { IFile } from "../../interfaces/file";

const getAllSpecialties = async () => {
  const result = await prisma.specialties.findMany();
  return result;
};

const getSpecialtiesById = async (id: string) => {
  const result = await prisma.specialties.findUniqueOrThrow({
    where: {
      id,
    },
  });
  return result;
};

const insertIntoDB = async (req: Request) => {
  const file = req.file as IFile;
  if (file) {
    const uploadToClaudinary = await fileUploader.uploadToCloudinary(file);
    req.body.icon = uploadToClaudinary?.secure_url;
  }

  const result = await prisma.specialties.create({
    data: req.body,
  });

  return result;
};

export const SpecialitiesService = {
  insertIntoDB,
  getAllSpecialties,
  getSpecialtiesById,
};
