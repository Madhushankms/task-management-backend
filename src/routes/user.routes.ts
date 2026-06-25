import { Router } from "express";
import {
  getAllUsers,
  getUserById,
  getProfile,
  deleteUser,
} from "../controllers/user.controller";
import { authenticate } from "../middleware/auth.middleware";
import { adminOnly } from "../middleware/role.middleware";

const router = Router();

router.use(authenticate);

router.get("/profile", getProfile);

router.get("/", adminOnly, getAllUsers);
router.get("/:id", adminOnly, getUserById);
router.delete("/:id", adminOnly, deleteUser);

export default router;
