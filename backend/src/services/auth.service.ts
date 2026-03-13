import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { env } from "@config/env.config";
import { getRedisClient } from "@config/redis.config";
import { User } from "@models/user.model";
import { HttpError } from "@middlewares/error.middleware";

const generateTokens = (id: string, email: string) => {
  const accessToken = jwt.sign({ id, email }, env.jwtSecret, {
    expiresIn: env.jwtExpiresIn as any,
  });
  const refreshToken = jwt.sign({ id, email }, env.jwtRefreshSecret, {
    expiresIn: env.jwtRefreshExpiresIn as any,
  });
  return { accessToken, refreshToken };
};

const getRedis = () => {
  const redis = getRedisClient();
  if (!redis) {
    throw new HttpError("Redis not connected", 503);
  }
  return redis;
};

export const register = async (
  email: string,
  password: string,
  displayName: string,
) => {
  const existing = await User.findOne({ email: email.toLowerCase() });
  if (existing) {
    throw new HttpError("Email already registered", 409);
  }

  const passwordHash = await bcrypt.hash(password, 12);
  const user = await User.create({ email, passwordHash, displayName });
  const tokens = generateTokens(user.id, user.email);

  const redis = getRedis();
  await redis.set(`refresh:${user.id}`, tokens.refreshToken, "EX", 7 * 24 * 60 * 60);

  return { user, ...tokens };
};

export const login = async (email: string, password: string) => {
  const user = await User.findOne({ email: email.toLowerCase() }).select("+passwordHash");
  if (!user) {
    throw new HttpError("Invalid email or password", 401);
  }

  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) {
    throw new HttpError("Invalid email or password", 401);
  }

  const tokens = generateTokens(user.id, user.email);

  const redis = getRedis();
  await redis.set(`refresh:${user.id}`, tokens.refreshToken, "EX", 7 * 24 * 60 * 60);

  return { user, ...tokens };
};

export const refreshToken = async (token: string) => {
  try {
    const decoded = jwt.verify(token, env.jwtRefreshSecret) as {
      id: string;
      email: string;
    };

    const redis = getRedis();
    const storedToken = await redis.get(`refresh:${decoded.id}`);
    if (!storedToken || storedToken !== token) {
      throw new HttpError("Invalid refresh token", 401);
    }

    const user = await User.findById(decoded.id);
    if (!user) {
      throw new HttpError("User not found", 404);
    }

    const tokens = generateTokens(user.id, user.email);
    await redis.set(`refresh:${user.id}`, tokens.refreshToken, "EX", 7 * 24 * 60 * 60);

    return tokens;
  } catch (err) {
    if (err instanceof HttpError) throw err;
    throw new HttpError("Invalid refresh token", 401);
  }
};

export const logout = async (userId: string) => {
  const redis = getRedis();
  await redis.del(`refresh:${userId}`);
};

export const getMe = async (userId: string) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new HttpError("User not found", 404);
  }
  return user;
};
