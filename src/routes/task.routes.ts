import { Router } from "express";
import {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
} from "../controllers/task.controller";
import { authenticate } from "../middleware/auth.middleware";
import {
  createTaskValidator,
  updateTaskValidator,
} from "../validators/task.validator";

const router = Router();

router.use(authenticate);

router.post("/", createTaskValidator, createTask);
router.get("/", getAllTasks);
router.get("/:id", getTaskById);
router.put("/:id", updateTaskValidator, updateTask);
router.delete("/:id", deleteTask);

export default router;
