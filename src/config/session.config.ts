import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import RedisStore from 'connect-redis';
import * as session from 'express-session';
import * as passport from 'passport';

export function sessionConfig(
  app: INestApplication,
  config: ConfigService,
  redisStore: RedisStore,
) {
  app.use(
    session({
      store: redisStore,
      secret: config.getOrThrow('SESSION_SECRET'),
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 14,
      },
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());
}
