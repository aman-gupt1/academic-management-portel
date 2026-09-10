import express from 'express';
import { authenticate } from '../middleware/auth.middleware.js';
import { getProfile , getUsers, changePassword, getUserDistribution} from '../controllers/user.controller.js';

const router=express.Router();

router.get("/profile", authenticate, getProfile);
router.get("/distribution", getUserDistribution);
router.post("/change-password",authenticate, changePassword)
router.get("/", getUsers);


export default router;