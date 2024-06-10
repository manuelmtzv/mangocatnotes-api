import { Redis } from 'ioredis';
import RedisStore from 'connect-redis';
import { ConfigService } from '@nestjs/config';

export async function redisConfig(config: ConfigService) {
  const redisClient = new Redis({
    host: config.getOrThrow('REDIS_HOST'),
    port: config.getOrThrow('REDIS_PORT'),
    password: config.getOrThrow('REDIS_PASSWORD'),
  });

  const redisStore = new RedisStore({
    client: redisClient,
    prefix: 'session:',
  });

  return { redisClient, redisStore };
}
