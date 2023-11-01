import { Module } from '@nestjs/common';
import { TwoFactorAuthController } from './twoFactorAuth.controller';
import { TwoFactorAuthService } from './twoFactorAuth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TwoFactorAuth } from './entities/twoFactorAuth.entity';
import { User } from '../users/entities/user.entity';
import { Authenticator } from 'src/providers/authenticator.provider';
import { Qrcode } from 'src/providers/qrcode.provider';
import { QRCODE, AUTHENTICATOR } from 'src/constant';
import { TwofactorJwtStrategy } from './guard/twoFactor-jwt-strategy';
import { MailModule } from '../../mail/mail.module';

@Module({
  imports: [TypeOrmModule.forFeature([User, TwoFactorAuth]), MailModule],
  providers: [
    TwoFactorAuthService,
    TwofactorJwtStrategy,
    {
      provide: AUTHENTICATOR,
      useClass: Authenticator,
    },
    {
      provide: QRCODE,
      useClass: Qrcode,
    },
  ],
  controllers: [TwoFactorAuthController],
  exports: [TwoFactorAuthService],
})
export class TwoFactorAuthModule {}
