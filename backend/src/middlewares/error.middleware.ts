import { Request, Response, NextFunction } from "express";
import { env } from "@config/env.config";

export interface AppError extends Error {
  statusCode?: number;
  status?: string;
  isOperational?: boolean;
}

export class HttpError extends Error implements AppError {
  statusCode: number;
  status: string;
  isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export const notFoundHandler = (
  req: Request,
  _res: Response,
  next: NextFunction,
): void => {
  const error = new HttpError(
    `Cannot find ${req.originalUrl} on this server`,
    404,
  );
  next(error);
};

export const errorHandler = (
  err: AppError,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  const statusCode = err.statusCode || 500;
  const status = err.status || "error";

  // Log error
  console.error("Error:", {
    message: err.message,
    stack: err.stack,
    statusCode,
  });

  // Send response
  res.status(statusCode).json({
    status,
    message: err.message,
    ...(env.nodeEnv === "development" && { stack: err.stack }),
  });
};
