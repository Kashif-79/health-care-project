import prisma from "../../../shared/prisma";
import bcrypt from "bcrypt";

const loginUser = async (payLoad: { email: string; password: string }) => {
  const userData = await prisma.user.findFirstOrThrow({
    where: {
      email: payLoad.email,
    },
  });

  const isCorrectPassword: boolean = await bcrypt.compare(
    payLoad.password,
    userData.password
  );
  console.log(isCorrectPassword);

  return userData;
};

export const AuthServices = {
  loginUser,
};
