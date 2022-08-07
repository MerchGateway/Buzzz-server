import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import configuration from 'src/config/configuration';
import { JwtStrategy } from './jwt.strategy';
import { GoogleOauthStrategy } from './google-oauth.strategy';
import { TwitterOauthStrategy } from './twitter-oauth.strategy';
import { LoggerModule } from 'src/logger/logger.module';
import { PasswordReset } from './entities/password-reset.entity';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: configuration().jwt.secret,
      signOptions: { expiresIn: configuration().jwt.expiresIn },
    }),
    UsersModule,
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([PasswordReset]),
    LoggerModule,
  ],
  controllers: [AuthController],
  providers: [
    LocalStrategy,
    JwtStrategy,
    GoogleOauthStrategy,
    TwitterOauthStrategy,
    AuthService,
    PasswordReset,
  ],
})
export class AuthModule {}
