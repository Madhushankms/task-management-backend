import jwt, { SignOptions } from "jsonwebtoken";
import { ENV } from "../config/env";

interface JwtPayload {
  id: number;
  email: string;
  role: string;
}

export const generateToken = (payload: JwtPayload): string => {
  const options: SignOptions = {
    expiresIn: ENV.JWT_EXPIRES_IN as SignOptions["expiresIn"],
  };

  return jwt.sign(
    { id: payload.id, email: payload.email, role: payload.role },
    ENV.JWT_SECRET,
    options,
  );
};

export const verifyToken = (token: string): JwtPayload => {
  return jwt.verify(token, ENV.JWT_SECRET) as JwtPayload;
};
