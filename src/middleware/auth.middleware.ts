import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt.utils";
import { AppError } from "./error.middleware";
import { HTTP_STATUS, MESSAGES } from "../constants";

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
      throw new AppError(MESSAGES.UNAUTHORIZED, HTTP_STATUS.UNAUTHORIZED);
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      throw new AppError(MESSAGES.UNAUTHORIZED, HTTP_STATUS.UNAUTHORIZED);
    }

    const decoded = verifyToken(token);
    req.user = decoded;

    next();
  } catch {
    next(new AppError(MESSAGES.UNAUTHORIZED, HTTP_STATUS.UNAUTHORIZED));
  }
};
