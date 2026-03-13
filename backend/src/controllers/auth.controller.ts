import { Request, Response } from "express";
import { asyncHandler } from "@utils/async-handler";
import { apiResponse } from "@utils/api-response";
import * as authService from "@services/auth.service";

export const register = asyncHandler(async (req: Request, res: Response) => {
  const { email, password, displayName } = req.body;
  const result = await authService.register(email, password, displayName);

  apiResponse({
    res,
    statusCode: 201,
    message: "User registered successfully",
    data: {
      user: result.user,
      accessToken: result.accessToken,
      refreshToken: result.refreshToken,
    },
  });
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const result = await authService.login(email, password);

  apiResponse({
    res,
    message: "Login successful",
    data: {
      user: result.user,
      accessToken: result.accessToken,
      refreshToken: result.refreshToken,
    },
  });
});

export const refreshToken = asyncHandler(
  async (req: Request, res: Response) => {
    const { refreshToken: token } = req.body;
    const tokens = await authService.refreshToken(token);

    apiResponse({
      res,
      message: "Token refreshed successfully",
      data: tokens,
    });
  },
);

export const logout = asyncHandler(async (req: Request, res: Response) => {
  await authService.logout(req.user!.id);

  apiResponse({
    res,
    message: "Logged out successfully",
  });
});

export const getMe = asyncHandler(async (req: Request, res: Response) => {
  const user = await authService.getMe(req.user!.id);

  apiResponse({
    res,
    message: "User retrieved successfully",
    data: user,
  });
});
