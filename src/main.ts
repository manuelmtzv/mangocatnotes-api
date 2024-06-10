import { NestFactory } from '@nestjs/core';
import { AppModule } from '@src/app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { swaggerConfig, sessionConfig, redisConfig } from '@/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  app.enableCors({
    origin: ['http://localhost:5173'],
    credentials: true,
  });

  // Swagger Config
  swaggerConfig(app);

  // Redis Config
  const { redisStore } = await redisConfig(config);

  // Session Config
  sessionConfig(app, config, redisStore);

  await app.listen(config.get('PORT') || 3000);
}
bootstrap();
