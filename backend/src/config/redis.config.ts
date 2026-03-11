import Redis from "ioredis";
import { env } from "./env.config";

let redisClient: Redis | null = null;

export const connectRedis = async (): Promise<Redis> => {
  if (redisClient) {
    return redisClient;
  }

  redisClient = new Redis({
    host: env.redisHost,
    port: env.redisPort,
    password: env.redisPassword || undefined,
    retryStrategy: (times) => {
      const delay = Math.min(times * 50, 2000);
      return delay;
    },
    maxRetriesPerRequest: 3,
  });

  redisClient.on("connect", () => {
    console.log("Redis connected");
  });

  redisClient.on("error", (err) => {
    console.error("Redis error:", err);
  });

  redisClient.on("close", () => {
    console.log("Redis connection closed");
  });

  return redisClient;
};

export const getRedisClient = (): Redis | null => {
  return redisClient;
};

export const disconnectRedis = async (): Promise<void> => {
  if (redisClient) {
    await redisClient.quit();
    redisClient = null;
  }
};
