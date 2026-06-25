import { Response } from "express";
import { HTTP_STATUS } from "../constants";

export const successResponse = (
  res: Response,
  data: unknown,
  message: string = "Success",
  statusCode: number = HTTP_STATUS.OK,
): Response => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

export const errorResponse = (
  res: Response,
  message: string = "Something went wrong",
  statusCode: number = HTTP_STATUS.INTERNAL_SERVER,
): Response => {
  return res.status(statusCode).json({
    success: false,
    message,
    data: null,
  });
};
