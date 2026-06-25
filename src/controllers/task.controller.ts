import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import prisma from "../config/database";
import { successResponse, errorResponse } from "../utils/response.utils";
import { AppError } from "../middleware/error.middleware";
import { HTTP_STATUS, MESSAGES, ROLES } from "../constants";

const taskInclude = {
  createdBy: {
    select: { id: true, name: true, email: true },
  },
  assignedTo: {
    select: { id: true, name: true, email: true },
  },
};

export const createTask = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      errorResponse(res, errors.array()[0]?.msg, HTTP_STATUS.BAD_REQUEST);
      return;
    }

    const { title, description, priority, status, dueDate, assignedToId } =
      req.body;

    const task = await prisma.task.create({
      data: {
        title,
        description,
        priority,
        status,
        dueDate: dueDate ? new Date(dueDate) : null,
        createdById: req.user?.id ?? 0,
        assignedToId: assignedToId || null,
      },
      include: taskInclude,
    });

    successResponse(res, task, MESSAGES.TASK_CREATED, HTTP_STATUS.CREATED);
  } catch (error) {
    next(error);
  }
};

export const getAllTasks = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { search, priority, status } = req.query;
    const isAdmin = req.user?.role === ROLES.ADMIN;
    const searchText = typeof search === "string" ? search : undefined;
    const tasks = await prisma.task.findMany({
      where: {
        ...(!isAdmin && {
          OR: [{ createdById: req.user?.id }, { assignedToId: req.user?.id }],
        }),

        ...(searchText && {
          title: { contains: String(searchText) },
        }),

        ...(priority && { priority: priority as never }),

        ...(status && { status: status as never }),
      },
      include: taskInclude,
      orderBy: { createdAt: "desc" },
    });

    successResponse(res, tasks);
  } catch (error) {
    next(error);
  }
};

export const getTaskById = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;
    const isAdmin = req.user?.role === ROLES.ADMIN;

    const task = await prisma.task.findUnique({
      where: { id: Number(id) },
      include: taskInclude,
    });

    if (!task) {
      throw new AppError(MESSAGES.TASK_NOT_FOUND, HTTP_STATUS.NOT_FOUND);
    }

    if (
      !isAdmin &&
      task.createdById !== req.user?.id &&
      task.assignedToId !== req.user?.id
    ) {
      throw new AppError(MESSAGES.FORBIDDEN, HTTP_STATUS.FORBIDDEN);
    }

    successResponse(res, task);
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      errorResponse(res, errors.array()[0]?.msg, HTTP_STATUS.BAD_REQUEST);
      return;
    }

    const { id } = req.params;
    const isAdmin = req.user?.role === ROLES.ADMIN;

    const task = await prisma.task.findUnique({
      where: { id: Number(id) },
    });

    if (!task) {
      throw new AppError(MESSAGES.TASK_NOT_FOUND, HTTP_STATUS.NOT_FOUND);
    }

    if (!isAdmin && task.createdById !== req.user?.id) {
      throw new AppError(MESSAGES.FORBIDDEN, HTTP_STATUS.FORBIDDEN);
    }

    const { title, description, priority, status, dueDate, assignedToId } =
      req.body;

    const updatedTask = await prisma.task.update({
      where: { id: Number(id) },
      data: {
        ...(title && { title }),
        ...(description && { description }),
        ...(priority && { priority }),
        ...(status && { status }),
        ...(dueDate && { dueDate: new Date(dueDate) }),
        ...(assignedToId && { assignedToId }),
      },
      include: taskInclude,
    });

    successResponse(res, updatedTask, MESSAGES.TASK_UPDATED);
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;
    const isAdmin = req.user?.role === ROLES.ADMIN;

    const task = await prisma.task.findUnique({
      where: { id: Number(id) },
    });

    if (!task) {
      throw new AppError(MESSAGES.TASK_NOT_FOUND, HTTP_STATUS.NOT_FOUND);
    }

    if (!isAdmin && task.createdById !== req.user?.id) {
      throw new AppError(MESSAGES.FORBIDDEN, HTTP_STATUS.FORBIDDEN);
    }

    await prisma.task.delete({
      where: { id: Number(id) },
    });

    successResponse(res, null, MESSAGES.TASK_DELETED);
  } catch (error) {
    next(error);
  }
};
