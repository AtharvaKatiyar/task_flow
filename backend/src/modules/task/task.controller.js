import ApiResponse from "../../utils/ApiResponse.js";
import { redis } from "../../config/redis.js";
import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
} from "./task.service.js";

export const create = async (
  req,
  res,
  next
) => {
  try {
    const task = await createTask(
      req.body,
      req.user.id
    );

    const response = new ApiResponse(
        200,
        "Tasks fetched",
        task
        );

        if (req.cacheKey) {
        await redis.set(
            req.cacheKey,
            JSON.stringify(response),
            {
            EX: 60,
            }
        );
        }

        return res
        .status(200)
        .json(response);
  } catch (error) {
    next(error);
  }
};

export const getAll = async (
  req,
  res,
  next
) => {
  try {
    const tasks = await getTasks(
      req.user,
      req.query
    );

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          "Tasks fetched",
          tasks
        )
      );
  } catch (error) {
    next(error);
  }
};

export const getOne = async (
  req,
  res,
  next
) => {
  try {
    const task = await getTaskById(
      req.params.id,
      req.user
    );

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          "Task fetched",
          task
        )
      );
  } catch (error) {
    next(error);
  }
};

export const update = async (
  req,
  res,
  next
) => {
  try {
    const task = await updateTask(
      req.params.id,
      req.body,
      req.user
    );

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          "Task updated",
          task
        )
      );
  } catch (error) {
    next(error);
  }
};

export const remove = async (
  req,
  res,
  next
) => {
  try {
    await deleteTask(
      req.params.id,
      req.user
    );

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          "Task deleted"
        )
      );
  } catch (error) {
    next(error);
  }
};