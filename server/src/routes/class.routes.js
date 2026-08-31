import express from "express";

import {
  createClass,
  getAllClasses,
  getClassById,
  updateClass,
  deleteClass,
} from "../controllers/class.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";

const router = express.Router();

router.post("/",authenticate, authorize("admin"), createClass);
router.get("/", authenticate, authorize("admin", "teacher"),getAllClasses);
router.get("/:id", authenticate, authorize("admin", "teacher"),getClassById);
router.put("/:id", authenticate, authorize("admin"), updateClass);
router.delete("/:id", authenticate, authorize("admin"), deleteClass);

export default router;