import express from "express";

import {
  createTest,
  getAllTests,
  getTestById,
  updateTest,
  deleteTest,
} from "../controllers/test.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";

const router = express.Router();

router.post("/", authenticate, authorize("admin", "teacher"),createTest);
router.get("/", getAllTests);

// all can access these 
router.get("/:id",authenticate, getTestById);
router.put("/:id",authenticate, updateTest);
router.delete("/:id",authenticate,authorize("admin", "teacher"), deleteTest);

export default router;