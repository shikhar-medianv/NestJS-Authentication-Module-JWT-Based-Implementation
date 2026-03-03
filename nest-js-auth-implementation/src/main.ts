import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,       // strips unknown properties from request body
    forbidNonWhitelisted: true, // throws error if unknown properties are sent
    transform: true,        // auto-transforms payloads to DTO types
  }));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
