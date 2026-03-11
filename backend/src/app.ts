import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";

import { env, corsOptions } from "@config/index";
import { errorHandler, notFoundHandler } from "@middlewares/index";
import routes from "@routes/index";

const app: Application = express();

// Security middlewares
app.use(helmet());
app.use(cors(corsOptions));

// Rate limiting
const limiter = rateLimit({
  windowMs: env.rateLimitWindowMs,
  max: env.rateLimitMaxRequests,
  message: {
    status: "error",
    message: "Too many requests, please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// Body parsing middlewares
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());

// Compression
app.use(compression());

// Logging
if (env.nodeEnv === "development") {
  app.use(morgan("dev"));
} else {
  app.use(morgan("combined"));
}

// API routes
app.use("/api/v1", routes);

// Error handling
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
