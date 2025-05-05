import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ForbiddenException, ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as express from 'express';
import * as path from 'path';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  app.use(
    '/swagger-custom.css',
    express.static(path.join(process.cwd(), 'src/config/swagger-custom.css')),
  );

  // Configure CORS dynamically based on environment variable
  const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || [];

  app.enableCors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(
          new ForbiddenException('Access denied: Your origin is not allowed.'),
        );
      }
    },
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('This is the API documentation for the projects')
    .setVersion('1.0')
    .addBasicAuth(
      {
        type: 'http',
        scheme: 'basic',
        description: 'Enter credentials to authenticate',
        in: 'header',
      },
      'basic-auth',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document, {
    customCssUrl: '/swagger-custom.css',
    swaggerOptions: {
      supportedSubmitMethods: ['get', 'post', 'put', 'delete'],
      persistAuthorization: true,
    },
  });

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
