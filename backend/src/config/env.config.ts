export const env = {
  // Server
  nodeEnv: process.env.NODE_ENV || "development",
  port: parseInt(process.env.PORT || "5000", 10),

  // Client
  clientUrls: process.env.CLIENT_URLS || "http://localhost:3000",

  // MongoDB
  mongoUri:
    process.env.MONGO_URI || "mongodb://localhost:27017/pomodoro-tracker",

  // Redis
  redisHost: process.env.REDIS_HOST || "localhost",
  redisPort: parseInt(process.env.REDIS_PORT || "6379", 10),
  redisPassword: process.env.REDIS_PASSWORD || "",

  // JWT
  jwtSecret: process.env.JWT_SECRET || "dev-jwt-secret-change-in-production",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "15m",
  jwtRefreshSecret:
    process.env.JWT_REFRESH_SECRET || "dev-refresh-secret-change-in-production",
  jwtRefreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7d",

  // Rate Limiting
  rateLimitWindowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || "900000", 10), // 15 minutes
  rateLimitMaxRequests: parseInt(
    process.env.RATE_LIMIT_MAX_REQUESTS || "100",
    10,
  ),
} as const;

export type Env = typeof env;
