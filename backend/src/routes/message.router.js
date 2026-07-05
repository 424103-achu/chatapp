import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import { sendMessage,getMessage } from "../controller/message.controller.js";

const router = express.Router();

router.post("/", authMiddleware, sendMessage);
router.get("/:conversationId",authMiddleware,getMessage);
export default router;