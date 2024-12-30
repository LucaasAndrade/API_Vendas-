import { RedisOptions } from 'ioredis';

interface IRedisConfig {
  config: {
    redis: RedisOptions;
  };
  driver: 'redis';
}

const redisConfig: IRedisConfig = {
  config: {
    redis: {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT
        ? parseInt(process.env.REDIS_PORT)
        : undefined,
      password: process.env.REDIS_PASSWORD || undefined,
    },
  },
  driver: 'redis',
};

export default redisConfig;
