import express from 'express';
import { authenticate } from '../middleware/auth.middleware.js';
import { getProfile , getUsers} from '../controllers/user.controller.js';

const router=express.Router();

router.get("/profile", authenticate, getProfile);
router.get("/", getUsers);


export default router;