import express from "express";

import authenticate from "../../middleware/auth.middleware.js";
import validate from "../../middleware/validate.middleware.js";
import cache from "../../middleware/cache.middleware.js";
import "./task.swagger.js";

import {
  createTaskSchema,
  updateTaskSchema,
} from "./task.validation.js";

import {
  create,
  getAll,
  getOne,
  update,
  remove,
} from "./task.controller.js";

const router = express.Router();

router.use(authenticate);

router.post(
  "/",
  validate(createTaskSchema),
  create
);

router.get(
  "/",
  cache("tasks"),
  getAll
);

router.get("/:id", getOne);

router.put(
  "/:id",
  validate(updateTaskSchema),
  update
);

router.delete("/:id", remove);

export default router;