import jwt, { JwtPayload, Secret } from "jsonwebtoken";

const generateToken = (payLoad: any, secret: Secret, expiresIn: any) => {
  const token = jwt.sign(payLoad, secret, {
    algorithm: "HS256",
    expiresIn,
  });
  return token;
};

const verifyToken = (token: string, secret: Secret) => {
  return jwt.verify(token, secret) as JwtPayload;
};

export const jwtHelper = {
  generateToken,
  verifyToken,
};
