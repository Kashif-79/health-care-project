import { UserStatus } from "@prisma/client";
import { jwtHelper } from "../../../helpars/jwtHelper";
import prisma from "../../../shared/prisma";
import bcrypt from "bcrypt";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import config from "../../../config";
import emailSender from "./emailSender";
import ApiError from "../../errors/ApiErrors";
import status from "http-status";
const loginUser = async (payLoad: { email: string; password: string }) => {
  const userData = await prisma.user.findFirstOrThrow({
    where: {
      email: payLoad.email,
      status: UserStatus.ACTIVE,
    },
  });

  const isCorrectPassword: boolean = await bcrypt.compare(
    payLoad.password,
    userData.password
  );
  if (!isCorrectPassword) {
    throw new Error("Password Incorrect");
  }

  const accessToken = jwtHelper.generateToken(
    {
      email: userData.email,
      role: userData.role,
    },
    config.jwt.jwt_secret as Secret,
    config.jwt.expires_in
  );

  const refreshToken = jwtHelper.generateToken(
    {
      email: userData.email,
      role: userData.role,
    },
    config.jwt.refresh_token_secret as Secret,
    config.jwt.refresh_token_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
    needPasswordChange: userData.needPasswordChange,
  };
};

const refreshToken = async (token: string) => {
  let decodedData;
  try {
    decodedData = jwtHelper.verifyToken(
      token,
      config.jwt.refresh_token_secret as Secret
    );
  } catch (err) {
    throw new Error("You are not authorized");
  }

  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: decodedData.email,
      status: UserStatus.ACTIVE,
    },
  });

  const accessToken = jwtHelper.generateToken(
    {
      email: userData.email,
      role: userData.role,
    },
    config.jwt.jwt_secret as Secret,
    config.jwt.expires_in
  );

  return {
    accessToken,
    needPasswordChange: userData.needPasswordChange,
  };
};

const changePassword = async (user: any, payLoad: any) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: user.email,
      status: UserStatus.ACTIVE,
    },
  });

  const isCorrectPassword: boolean = await bcrypt.compare(
    payLoad.oldPassword,
    userData.password
  );
  if (!isCorrectPassword) {
    throw new Error("Password Incorrect");
  }
  const hashedPassword: string = await bcrypt.hash(payLoad.newPassword, 12);

  await prisma.user.update({
    where: {
      email: userData.email,
    },
    data: {
      password: hashedPassword,
      needPasswordChange: false,
    },
  });

  return {
    message: "Password Change Successfully",
  };
};
const forgotPassword = async (payLoad: { email: string }) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: payLoad.email,
      status: UserStatus.ACTIVE,
    },
  });

  const resetPasswordToken = jwtHelper.generateToken(
    { email: userData.email, role: userData.role },
    config.jwt.reset_passord_secret as Secret,
    config.jwt.reset_passord_token_expires_in as string
  );

  const resetPassLink =
    config.reset_passord_link +
    `?userId=${userData.id}&token=${resetPasswordToken}`;
  await emailSender(
    userData.email,

    `<div>
      <p>Dear User,</p>
        <p>Your password reset link 
          <a href=${resetPassLink}>
            <button>
              Reset Password
            </button>
          </a>
        </p>
      </div>`
  );
  console.log(resetPassLink);
};

const resetPassword = async (
  token: string,
  payLoad: { id: string; password: string }
) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      id: payLoad.id,
      status: UserStatus.ACTIVE,
    },
  });
  const isValidToken = jwtHelper.verifyToken(
    token,
    config.jwt.reset_passord_secret as Secret
  );
  if (!isValidToken) {
    throw new ApiError(status.FORBIDDEN, "Forbidden!");
  }
  const hashedPassword: string = await bcrypt.hash(payLoad.password, 12);

  await prisma.user.update({
    where: {
      id: payLoad.id,
    },
    data: {
      password: hashedPassword,
    },
  });
  return {
    message: "Password chnaged Successfully",
  };
};

export const AuthServices = {
  loginUser,
  refreshToken,
  changePassword,
  forgotPassword,
  resetPassword,
};
