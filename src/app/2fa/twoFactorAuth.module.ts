import { Module } from '@nestjs/common';
import { TwoFactorAuthController } from './twoFactorAuth.controller';
import { twoFactorAuthService } from './twoFactorAuth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TwoFactorAuth } from './entities/twoFactorAuth.entity';
import { User } from '../users/entities/user.entity';
import { Authenticator } from 'src/providers/authenticator.provider';
import { Qrcode } from 'src/providers/qrcode.provider';
import { QRCODE, AUTHENTICATOR } from 'src/constant';
import { AuthModule } from '../auth/auth.module';


@Module({
  imports: [
    AuthModule,TypeOrmModule.forFeature([User, TwoFactorAuth])],
  providers: [
    twoFactorAuthService,
    {
      provide: AUTHENTICATOR,
      useValue: Authenticator,
    },
    {
      provide: QRCODE,
      useValue: Qrcode,
    },
  ],
  controllers: [TwoFactorAuthController],
  exports: [twoFactorAuthService],
})
export class TwoFactorAuthModule {}
