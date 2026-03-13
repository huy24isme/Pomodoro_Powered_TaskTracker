import { Response } from "express";

interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

interface ApiResponseOptions<T> {
  res: Response;
  statusCode?: number;
  success?: boolean;
  message?: string;
  data?: T;
  meta?: PaginationMeta;
}

export const apiResponse = <T>({
  res,
  statusCode = 200,
  success = true,
  message = "Success",
  data,
  meta,
}: ApiResponseOptions<T>): void => {
  res.status(statusCode).json({
    success,
    message,
    data,
    ...(meta && { meta }),
  });
};
