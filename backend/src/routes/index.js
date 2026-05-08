import express from "express";

import authRoutes from "../modules/auth/auth.routes.js";
import taskRoutes from "../modules/task/task.routes.js";
import userRoutes from "../modules/user/user.routes.js";

const router = express.Router();

router.use("/auth", authRoutes);

router.use("/tasks", taskRoutes);

router.use("/users", userRoutes);

export default router;