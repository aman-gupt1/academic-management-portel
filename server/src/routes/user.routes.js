import express from 'express';
import { authenticate } from '../middleware/auth.middleware.js';
import { getProfile , getUsers, changePassword} from '../controllers/user.controller.js';

const router=express.Router();

router.get("/profile", authenticate, getProfile);
router.post("/change-profile",authenticate, changePassword)
router.get("/", getUsers);


export default router;