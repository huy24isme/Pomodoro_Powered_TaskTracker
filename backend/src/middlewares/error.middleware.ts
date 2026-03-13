import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
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
  err: AppError | ZodError,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  // Handle Zod validation errors
  if (err instanceof ZodError) {
    const errors = err.issues.map((e) => ({
      field: e.path.map(String).join("."),
      message: e.message,
    }));

    res.status(400).json({
      success: false,
      message: "Validation failed",
      errors,
    });
    return;
  }

  // Handle Mongoose duplicate key error
  if ((err as any).code === 11000) {
    const field = Object.keys((err as any).keyValue || {})[0] || "field";
    res.status(409).json({
      success: false,
      message: `Duplicate value for ${field}`,
    });
    return;
  }

  // Handle Mongoose validation error
  if (err.name === "ValidationError") {
    const mongooseErr = err as any;
    const errors = Object.values(mongooseErr.errors).map((e: any) => ({
      field: e.path,
      message: e.message,
    }));

    res.status(400).json({
      success: false,
      message: "Validation failed",
      errors,
    });
    return;
  }

  // Handle Mongoose CastError (invalid ObjectId)
  if (err.name === "CastError") {
    res.status(400).json({
      success: false,
      message: "Invalid ID format",
    });
    return;
  }

  const statusCode = (err as AppError).statusCode || 500;
  const status = (err as AppError).status || "error";

  // Log error
  console.error("Error:", {
    message: err.message,
    stack: err.stack,
    statusCode,
  });

  // Send response
  res.status(statusCode).json({
    success: false,
    status,
    message: err.message,
    ...(env.nodeEnv === "development" && { stack: err.stack }),
  });
};
