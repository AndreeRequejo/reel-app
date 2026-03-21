/* eslint-disable @typescript-eslint/no-floating-promises */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Headers de seguridad
  app.use(helmet());

  // Lectura de cookies
  app.use(cookieParser());

  // Global prefix para la API
  app.setGlobalPrefix('api');

  // Validación global de DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // elimina campos no declarados en el DTO
      forbidNonWhitelisted: true, // lanza error si llegan campos extra
      transform: true,
    }),
  );

  // CORS restringido
  app.enableCors({
    origin: process.env.FRONTEND_URL,
    credentials: true, // necesario para que las cookies funcionen cross-origin
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
