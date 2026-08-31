import express from "express";
import {
  createTeacher,
  getAllTeachers,
  getTeacherById,
  updateTeacher,
  deleteTeacher,
} from "../controllers/teacher.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";

const router = express.Router();

router.post("/",authenticate,authorize("admin"),createTeacher);
router.get("/",authenticate, authorize("admin", "teacher"), getAllTeachers);
router.get("/:id", authenticate, authorize("admin", "teacher"),getTeacherById);
router.put("/:id", authenticate, authorize("admin"),updateTeacher);
router.delete("/:id",authenticate, authorize("admin"), deleteTeacher);

export default router;