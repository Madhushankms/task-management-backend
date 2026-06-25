import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import prisma from "../config/database";
import { hashPassword, comparePassword } from "../utils/bcrypt.utils";
import { generateToken } from "../utils/jwt.utils";
import { successResponse, errorResponse } from "../utils/response.utils";
import { AppError } from "../middleware/error.middleware";
import { HTTP_STATUS, MESSAGES } from "../constants";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    // Check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      errorResponse(res, errors.array()[0]?.msg, HTTP_STATUS.BAD_REQUEST);
      return;
    }

    const { name, email, password, role } = req.body;

    // Check if email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      errorResponse(res, MESSAGES.EMAIL_EXISTS, HTTP_STATUS.BAD_REQUEST);
      return;
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: role || "user",
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    // Generate token
    const token = generateToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    successResponse(
      res,
      { user, token },
      MESSAGES.REGISTER_SUCCESS,
      HTTP_STATUS.CREATED,
    );
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    // Check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      errorResponse(res, errors.array()[0]?.msg, HTTP_STATUS.BAD_REQUEST);
      return;
    }

    const { email, password } = req.body;

    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new AppError(
        MESSAGES.INVALID_CREDENTIALS,
        HTTP_STATUS.UNAUTHORIZED,
      );
    }

    // Compare password
    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      throw new AppError(
        MESSAGES.INVALID_CREDENTIALS,
        HTTP_STATUS.UNAUTHORIZED,
      );
    }

    // Generate token
    const token = generateToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    successResponse(
      res,
      {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        token,
      },
      MESSAGES.LOGIN_SUCCESS,
    );
  } catch (error) {
    next(error);
  }
};
