import ApiResponse from "../../utils/ApiResponse.js";

import {
  getUsers,
  getUserById,
  deleteUser,
} from "./user.service.js";

export const getAllUsers = async (
  req,
  res,
  next
) => {
  try {
    const users = await getUsers();

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          "Users fetched",
          users
        )
      );
  } catch (error) {
    next(error);
  }
};

export const getSingleUser = async (
  req,
  res,
  next
) => {
  try {
    const user = await getUserById(
      req.params.id
    );

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          "User fetched",
          user
        )
      );
  } catch (error) {
    next(error);
  }
};

export const removeUser = async (
  req,
  res,
  next
) => {
  try {
    await deleteUser(req.params.id);

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          "User deleted"
        )
      );
  } catch (error) {
    next(error);
  }
};