import { forwardRef, Module } from '@nestjs/common';
import { TwoFactorAuthController } from './twoFactorAuth.controller';
import { TwoFactorAuthService } from './twoFactorAuth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TwoFactorAuth } from './entities/twoFactorAuth.entity';
import { User } from '../users/entities/user.entity';
import { Authenticator } from 'src/providers/authenticator.provider';
import { Qrcode } from 'src/providers/qrcode.provider';
import { QRCODE, AUTHENTICATOR } from 'src/constant';
import { AuthModule } from '../auth/auth.module';
import { EMAIL_PROVIDER } from '../../constant';
import { ConfigService } from '@nestjs/config';
import { NodemailerProvider } from '../../providers/nodemailer.provider'
import { TwofactorJwtStrategy } from './guard/twoFactor-jwt-strategy';

@Module({
  imports: [
   
    TypeOrmModule.forFeature([User, TwoFactorAuth]),
  ],
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
    {
      provide: EMAIL_PROVIDER,
      useFactory: (configService: ConfigService) => {
        return new NodemailerProvider(configService);
      },
      inject: [ConfigService],
    },
  ],
  controllers: [TwoFactorAuthController],
  exports: [TwoFactorAuthService],
})
export class TwoFactorAuthModule {}
