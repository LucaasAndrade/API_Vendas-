import { Request, Response, NextFunction } from 'express';
import { RateLimiterRedis } from 'rate-limiter-flexible';
import Redis from 'ioredis';
import AppError from '../errors/appError';

export default async function rateLimit(
  request: Request,
  _response: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const redisClient = new Redis({
      host: process.env.REDIS_HOST,
      port: parseInt(process.env.REDIS_PORT as string),
      password: process.env.REDIS_PASSWORD || undefined,
    });

    const limiter = new RateLimiterRedis({
      storeClient: redisClient,
      keyPrefix: 'ratelimit',
      points: 5, // 5 requests
      duration: 1, // per 1 second by IP
    });

    await limiter.consume(String(request.ip));

    return next();
  } catch (err) {
    throw new AppError('Too many requests.', 429);
  }
}
