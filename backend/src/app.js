import express from "express";
import { configDotenv } from "dotenv";
configDotenv();
import healthrouter from "./routes/health.router.js";
import authrouter from "./routes/auth.routes.js";
import userrouter from "./routes/users.router.js";
import conversationrrouter from "./routes/convo.router,.js"
import msgrouter from "./routes/message.router.js"
const app = express();
app.use(express.json());
app.use("/api/health", healthrouter);
app.use("/api/users", userrouter);
app.use("/api/auth",authrouter);
app.use("/api/conversations",conversationrrouter);
app.use("/api/messages",msgrouter);
export default app;