import express from "express";

import {
  createAttendance,
  getAllAttendance,
  getAttendanceById,
  updateAttendance,
  deleteAttendance,
} from "../controllers/attendance.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";

const router = express.Router();

router.post("/", authenticate, authorize("admin", "teacher"),createAttendance);
router.get("/", authenticate,authorize("admin", "teacher", "student"), getAllAttendance);
router.get("/:id",authenticate, authorize("admin", "teacher", "student"), getAttendanceById);
router.put("/:id",authenticate, authorize("admin", "teacher"), updateAttendance);
router.delete("/:id",authenticate,authorize("admin"), deleteAttendance);

export default router;