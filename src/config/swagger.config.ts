import { INestApplication } from '@nestjs/common';
import {
  SwaggerModule,
  DocumentBuilder,
  SwaggerDocumentOptions,
} from '@nestjs/swagger';

export function swaggerConfig(app: INestApplication) {
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Mangocatnotes API')
    .setDescription('The Mangocatnotes API endpoint documentation.')
    .setVersion('1.0')
    .addBearerAuth(
      {
        description: 'JWT Authorization',
        type: 'http',
        in: 'header',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'JWT-auth',
    )
    .addSecurityRequirements('bearer')
    .build();

  const swaggerOptions: SwaggerDocumentOptions = {
    operationIdFactory: (_: string, methodKey: string) => methodKey,
  };

  const swaggerDocument = SwaggerModule.createDocument(
    app,
    swaggerConfig,
    swaggerOptions,
  );

  SwaggerModule.setup('api', app, swaggerDocument);
}
