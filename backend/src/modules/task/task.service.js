import {prisma} from "../../config/db.js";
import { clearCacheByPrefix } from "../../utils/cache.js";
import ApiError from "../../utils/ApiError.js";

export const createTask = async (
  data,
  userId
) => {
  const task = await prisma.task.create({
    data: {
      ...data,
      userId,
    },
  });
  await clearCacheByPrefix("tasks");
  return task;
};

export const getTasks = async (
  user,
  query
) => {
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;

  const skip = (page - 1) * limit;

  const where = {};

  if (user.role !== "ADMIN") {
    where.userId = user.id;
  }

  if (query.status) {
    where.status = query.status;
  }

  const tasks = await prisma.task.findMany({
    where,
    skip,
    take: limit,
    orderBy: {
      createdAt: "desc",
    },
  });

  return tasks;
};

export const getTaskById = async (
  taskId,
  user
) => {
  const task = await prisma.task.findUnique({
    where: {
      id: taskId,
    },
  });

  if (!task) {
    throw new ApiError(404, "Task not found");
  }

  if (
    user.role !== "ADMIN" &&
    task.userId !== user.id
  ) {
    throw new ApiError(403, "Forbidden");
  }

  return task;
};

export const updateTask = async (
  taskId,
  data,
  user
) => {
  const existingTask =
    await prisma.task.findUnique({
      where: {
        id: taskId,
      },
    });

  if (!existingTask) {
    throw new ApiError(404, "Task not found");
  }

  if (
    user.role !== "ADMIN" &&
    existingTask.userId !== user.id
  ) {
    throw new ApiError(403, "Forbidden");
  }

  const updatedTask =
    await prisma.task.update({
      where: {
        id: taskId,
      },
      data,
    });
  await clearCacheByPrefix("tasks");
  return updatedTask;
};

export const deleteTask = async (
  taskId,
  user
) => {
  const existingTask =
    await prisma.task.findUnique({
      where: {
        id: taskId,
      },
    });

  if (!existingTask) {
    throw new ApiError(404, "Task not found");
  }

  if (
    user.role !== "ADMIN" &&
    existingTask.userId !== user.id
  ) {
    throw new ApiError(403, "Forbidden");
  }

  await prisma.task.delete({
    where: {
      id: taskId,
    },
  });
  await clearCacheByPrefix("tasks");
  return null;
};