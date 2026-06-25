import { body, ValidationChain } from "express-validator";

export const createTaskValidator: ValidationChain[] = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 3, max: 255 })
    .withMessage("Title must be between 3 and 255 characters"),

  body("description")
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage("Description must not exceed 1000 characters"),

  body("priority")
    .optional()
    .isIn(["Low", "Medium", "High"])
    .withMessage("Priority must be Low, Medium or High"),

  body("status")
    .optional()
    .isIn(["Open", "In_Progress", "Testing", "Done"])
    .withMessage("Status must be Open, In_Progress, Testing or Done"),

  body("dueDate")
    .optional()
    .isISO8601()
    .withMessage("Due date must be a valid date")
    .toDate(),

  body("assignedToId")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Assigned user must be a valid ID"),
];

export const updateTaskValidator: ValidationChain[] = [
  body("title")
    .optional()
    .trim()
    .isLength({ min: 3, max: 255 })
    .withMessage("Title must be between 3 and 255 characters"),

  body("description")
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage("Description must not exceed 1000 characters"),

  body("priority")
    .optional()
    .isIn(["Low", "Medium", "High"])
    .withMessage("Priority must be Low, Medium or High"),

  body("status")
    .optional()
    .isIn(["Open", "In_Progress", "Testing", "Done"])
    .withMessage("Status must be Open, In_Progress, Testing or Done"),

  body("dueDate")
    .optional()
    .isISO8601()
    .withMessage("Due date must be a valid date")
    .toDate(),

  body("assignedToId")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Assigned user must be a valid ID"),
];
