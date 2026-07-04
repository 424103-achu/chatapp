import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import { signup,login,getMe } from "../controller/auth.controller.js";

const router = Router();

router.post("/signup", signup);
router.post("/login",login);
router.get("/me", authMiddleware, getMe);
// router.post("/login",login);
export default router;