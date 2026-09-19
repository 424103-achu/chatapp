import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import { createConvo,getConvo } from "../controller/convo.controller..js";
const router=express.Router()
router.post("/",authMiddleware,createConvo);
router.get("/",authMiddleware,getConvo);
export default router;
