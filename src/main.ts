import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as express from 'express';
import * as session from 'express-session';
import * as passport from 'passport';
import { validationExceptionFactory } from './utils/validation';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const config: ConfigService = app.get(ConfigService);
  app.setGlobalPrefix('v1');
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ extended: true, limit: '50mb' }));
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      exceptionFactory: validationExceptionFactory,
    }),
  );
  app.enableCors({
    origin: [
      'https://b9vn1qt4-3000.uks1.devtunnels.ms/',
      config.get<string>('clientUrl'),
      config.get<string>('designClientUrl'),
      config.get<string>('debugClientUrl'),
      config.get<string>('debugDesignClientUrl'),
    ],
    credentials: true,
  });
  app.use(express.static(join(__dirname, 'public')));
  app.set('view engine', 'html');
  app.engine('html', (await import('ejs')).renderFile);
  const sessionSecret = config.get<string>('passportSessionSecret');
  app.set('trust proxy', 1);
  app.use(
    session({
      secret: sessionSecret,
      resave: false,
      saveUninitialized: true,
      proxy: true,
      cookie: { secure: true, sameSite: 'none' },
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  const port: number = config.get<number>('port');
  await app.listen(port);
}
bootstrap();
