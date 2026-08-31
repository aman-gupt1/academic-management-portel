import express from "express";

import {
  createResult,
  getAllResults,
  getResultById,
  updateResult,
  deleteResult,
} from "../controllers/result.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";

const router = express.Router();

router.post("/",authenticate, authorize("admin", "teacher"), createResult);
router.get("/",authenticate, authorize("admin", "teacher", "student"), getAllResults); //apply filter for student own result
router.get("/:id", authenticate, authorize("admin", "teacher", "student"), getResultById);
router.put("/:id",authenticate, authorize("admin", "teacher"), updateResult);
router.delete("/:id", authenticate, authorize("admin"), deleteResult);

export default router;