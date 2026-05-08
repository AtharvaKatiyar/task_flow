import ApiResponse from "../../utils/ApiResponse.js";

import {
  registerUser,
  loginUser,
  getCurrentUser,
} from "./auth.service.js";

export const register = async (req, res, next) => {
  try {
    const result = await registerUser(req.body);

    return res
      .status(201)
      .json(new ApiResponse(201, "User registered", result));
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const result = await loginUser(req.body);

    return res
      .status(200)
      .json(new ApiResponse(200, "Login successful", result));
  } catch (error) {
    next(error);
  }
};

export const me = async (req, res, next) => {
  try {
    const user = await getCurrentUser(req.user.id);

    return res
      .status(200)
      .json(new ApiResponse(200, "Current user fetched", user));
  } catch (error) {
    next(error);
  }
};