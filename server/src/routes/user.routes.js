import express from 'express';
import { authenticate } from '../middleware/auth.middleware.js';
import { authorize } from "../middleware/role.middleware.js";
import { getProfile , getUsers, changePassword, getUserDistribution, deleteUser, updateUserRole, updateUserStatus} from '../controllers/user.controller.js';

const router=express.Router();

router.get("/profile", authenticate, getProfile);
router.get("/distribution", authenticate, getUserDistribution);
router.get("/", authenticate, getUsers);

router.post("/change-password",authenticate, changePassword)
router.delete("/:id",authenticate,authorize("admin"), deleteUser);
router.patch("/:id/role",authenticate,authorize("admin"),updateUserRole);
router.patch("/:id/status",authenticate,authorize("admin"),updateUserStatus);


export default router;