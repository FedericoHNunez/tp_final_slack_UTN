import express from "express";
import connectMongoDB from "./config/mongo.configDB.js";
import userRouter from "./routes/user.router.js";
import authRouter from "./routes/auth.router.js";
import jsonErrorHandler from "./middlewares/jsonError.middleware.js";
import errorHandler from "./middlewares/errorHandler.middleware.js";
import successResponse from "./helpers/response.helper.js";
import workspaceRouter from "./routes/workspace.router.js";
import directMessageRouter from "./routes/directMessage.router.js";
import ENVIRONMENT from "./config/environment.config.js";
import memberRouter from "./routes/member.router.js";
import channelRouter from "./routes/channel.router.js";
import authMiddleware from "./middlewares/auth.middleware.js";
// 1. Connect to the database

await connectMongoDB();

const PORT = ENVIRONMENT.PORT;
const app = express();

app.use(express.json());

// Middleware to catch JSON format errors (SyntaxError)
app.use(jsonErrorHandler);

// Healthcheck endpoint
app.get("/api/status", (req, res) => {
  return successResponse(res, "Express Server OK!");
});

// Authentication endpoints
app.use("/api/auth", authRouter);

// User endpoints
app.use("/api/users", authMiddleware, userRouter);

// Workspaces
app.use('/api/workspaces', authMiddleware, workspaceRouter);

// Direct messages
app.use('/api/directMessages', authMiddleware, directMessageRouter);
// Members
app.use('/api/members', authMiddleware, memberRouter);
// Channels
app.use('/api/channels', authMiddleware, channelRouter);
// Centralized error handler
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});



