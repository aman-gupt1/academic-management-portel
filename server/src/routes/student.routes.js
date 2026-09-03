import express from "express";
import {createStudent,getAllStudents,getStudentById,updateStudent,deleteStudent, getStudentStats
} from "../controllers/student.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";

const router = express.Router();

router.post("/", authenticate, authorize("admin"), createStudent);
router.get("/", authenticate, authorize("admin", "teacher"), getAllStudents);
router.get('/stats',getStudentStats)
router.get("/:id", authenticate, authorize("admin", "teacher"), getStudentById);
router.put("/:id", authenticate, authorize("admin"), updateStudent);
router.delete("/:id", authenticate, authorize("admin"), deleteStudent);

export default router;