import { Request, Response, NextFunction } from "express";
import { AppError } from "./error.middleware";
import { HTTP_STATUS, MESSAGES, ROLES } from "../constants";

export const adminOnly = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  try {
    if (req.user?.role !== ROLES.ADMIN) {
      throw new AppError(MESSAGES.FORBIDDEN, HTTP_STATUS.FORBIDDEN);
    }

    next();
  } catch {
    next(new AppError(MESSAGES.FORBIDDEN, HTTP_STATUS.FORBIDDEN));
  }
};
