import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../constants";
import { ENV } from "../config/env";

export class AppError extends Error {
  readonly statusCode: number;
  readonly isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

interface ErrorResponse {
  success: boolean;
  message: string;
  data: null;
  stack?: string;
}

export const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,

  next: NextFunction,
): void => {
  const statusCode = err.statusCode || HTTP_STATUS.INTERNAL_SERVER;
  const message = err.message || "Internal Server Error";

  const response: ErrorResponse = {
    success: false,
    message,
    data: null,
  };

  if (ENV.NODE_ENV === "development") {
    response.stack = err.stack;
  }

  res.status(statusCode).json(response);
};
