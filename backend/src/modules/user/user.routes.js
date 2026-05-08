import express from "express";

import authenticate from "../../middleware/auth.middleware.js";
import authorize from "../../middleware/role.middleware.js";
import "./user.swagger.js";
import {
  getAllUsers,
  getSingleUser,
  removeUser,
} from "./user.controller.js";

const router = express.Router();

router.use(authenticate);

router.use(authorize("ADMIN"));

router.get("/", getAllUsers);

router.get("/:id", getSingleUser);

router.delete("/:id", removeUser);

export default router;