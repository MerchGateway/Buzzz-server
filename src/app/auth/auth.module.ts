import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/app/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/app/users/entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './guards/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import configuration from 'src/config/configuration';
import { JwtStrategy } from './guards/jwt.strategy';
import { GoogleOauthStrategy } from './guards/google-oauth.strategy';
import { TwitterOauthStrategy } from './guards/twitter-oauth.strategy';
import { LoggerModule } from 'src/logger/logger.module';
import { PasswordReset } from './entities/password-reset.entity';
import { WalletModule } from '../wallet/wallet.module';
import { AdminModule } from '../admin/admin.module';
import { NotificationModule } from '../notification/notification.module';
import { TwoFactorAuthModule } from '../2fa/twoFactorAuth.module';
import { DesignModule } from '../design/design.module';
import { SessionSerializer } from './guards/session.serializer';
import { MailModule } from '../../mail/mail.module';

@Module({
  imports: [
    TwoFactorAuthModule,
    DesignModule,
    PassportModule.register({ session: true }),
    AdminModule,
    JwtModule.register({
      secret: configuration().jwt.secret,
      signOptions: { expiresIn: configuration().jwt.expiresIn },
    }),
    UsersModule,
    NotificationModule,
    TypeOrmModule.forFeature([User, PasswordReset]),
    LoggerModule,
    forwardRef(() => WalletModule),
    MailModule,
  ],
  controllers: [AuthController],
  providers: [
    LocalStrategy,
    JwtStrategy,
    GoogleOauthStrategy,
    TwitterOauthStrategy,
    SessionSerializer,
    AuthService,
    PasswordReset,
  ],
  exports: [AuthService],
})
export class AuthModule {}
