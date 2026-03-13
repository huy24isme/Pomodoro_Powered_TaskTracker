import "express";

declare module "express" {
  interface Request {
    user?: {
      id: string;
      email: string;
    };
    params: Record<string, string>;
  }
}
