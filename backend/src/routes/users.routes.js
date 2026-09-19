import express from "express";
import prisma from "../config/prisma.js";
import authMiddleware from "../middleware/auth.middleware.js";
import { searchUsers } from "../controller/user.controller.js";
const router = express.Router();
router.get("/",authMiddleware,searchUsers);
export default router;
