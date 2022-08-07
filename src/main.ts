import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('v1');
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.enableCors();
  const config: ConfigService = app.get(ConfigService);
  const port: number = config.get<number>('port');
  await app.listen(port);
}
bootstrap();
