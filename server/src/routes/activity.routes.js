import express from "express";

import {
  createActivity,
  getAllActivities,
  getActivityById,
  updateActivity,
  deleteActivity,
} from "../controllers/activity.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";


const router = express.Router();

router.post("/",authenticate, authorize("admin", "teacher"), createActivity);
router.get("/",authenticate, authorize("admin", "teacher", "student"), getAllActivities);
router.get("/:id",  authenticate, authorize("admin", "teacher", "student"), getActivityById);
router.put("/:id",authenticate, authorize("admin", "teacher"), updateActivity);
router.delete("/:id",authenticate,authorize("admin"), deleteActivity);

export default router;