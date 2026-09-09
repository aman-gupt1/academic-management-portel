import express from 'express';
import { createUser,loginUser, logoutUser, forgotPassword, resetPassword} from '../controllers/auth.controller.js';
import { authorize } from '../middleware/role.middleware.js';
import { authenticate } from '../middleware/auth.middleware.js';

const router=express.Router();

router.post("/register",authenticate, authorize("admin"), createUser);
router.post("/login",loginUser)
router.post("/forgot-password",forgotPassword)
router.post("/reset-password/:token",resetPassword);
router.post("/logout",authenticate,logoutUser)

export default router;