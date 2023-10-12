import {
  Injectable,
  HttpException,
  UnauthorizedException,
  Inject,
  HttpStatus,
} from '@nestjs/common';

import { Toggle2faDto } from './dto/toggle2fa.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TwoFactorAuth } from './entities/twoFactorAuth.entity';
import { User } from '../users/entities/user.entity';
import { AUTHENTICATOR, QRCODE } from 'src/constant';
import { AuthenticatorProvider } from 'src/types/authenticator';
import { QrcodeProvider } from 'src/types/qrcode';
import { EMAIL_PROVIDER } from '../../constant';
import { EmailProvider } from '../../types/email';
import { SuccessResponse } from 'src/utils/response';
import { AuthType } from 'src/types/authenticator';

@Injectable()
export class TwoFactorAuthService {
  constructor(
    @InjectRepository(TwoFactorAuth)
    private readonly twoFactorAuthRepository: Repository<TwoFactorAuth>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @Inject(AUTHENTICATOR) private authenticator: AuthenticatorProvider,
    @Inject(QRCODE) private qrcode: QrcodeProvider,
    @Inject(EMAIL_PROVIDER)
    private emailProvider: EmailProvider,
  ) {}

  public async toggle2fa(payload: Toggle2faDto, user: User): Promise<any> {
    try {
      if (payload.allow2fa == false) {
        await this.userRepository.save({
          ...user,
          isTwoFactorVerified: false,
          allow2fa: false,
        });
        return new SuccessResponse(
          {},
          'two factor authentication turned off successfully',
          200,
        );
      }
      console.log(user);
      const updatedUser = await this.userRepository.save({
        ...user,
        isTwoFactorVerified: false,
        allow2fa: true,
      });

      console.log('passed here');
      return await this.initialize2fa(updatedUser);
    } catch (err: any) {
      throw new HttpException(err.message, err.status);
    }
  }

  async generateOtp(user: User): Promise<any> {
    try {
      const twoFaSecret =
        await this.authenticator.generateTwoFactorAuthenticationSecret(user);

      const token = this.authenticator.generate(twoFaSecret.secret);

      const twoFactorAuthData = new TwoFactorAuth();
      twoFactorAuthData.user = user;
      twoFactorAuthData.secret = twoFaSecret.secret;
      // const twoFactorAuthData = this.twoFactorAuthRepository.create({
      //   user,
      //   secret: twoFaSecret.secret,
      // });

      await this.twoFactorAuthRepository.save(twoFactorAuthData);

      // send otp to email
      await this.emailProvider.sendMail({
        message: `Your OTP  is ${token}`,
        to: user.email,
        subject: 'Login OTP',
      });

      return new SuccessResponse(
        {},
        'OTP sent to registered email',
        HttpStatus.CREATED,
      );
    } catch (err: any) {
      throw new HttpException(err.message, err.status);
    }
  }

  private async generateQrCode(user: User): Promise<{ qrcode: any }> {
    try {
      const twoFaSecret =
        await this.authenticator.generateTwoFactorAuthenticationSecret(user);

      const qrcodeDataUrl = await this.qrcode.generateQrCodeDataURL(
        twoFaSecret.otpAuthUrl,
      );

      const generatedQrData: TwoFactorAuth =
        this.twoFactorAuthRepository.create({
          user,
          secret: twoFaSecret.secret,
        });

      await this.twoFactorAuthRepository.save(generatedQrData);
      //  return a qrcode image url to client (png)

      return { qrcode: qrcodeDataUrl };
    } catch (err: any) {
      throw new HttpException(err.message, err.status);
    }
  }

  public async initialize2fa(user: User): Promise<any> {
    try {
      // ensure 2fa is turned uon
      if (user.allow2fa == false) {
        await this.userRepository.save({
          ...user,
          allow2fa: true,
          isTwoFactorVerified: false,
        });
      }
      console.log('passed init save');
      if (user.twoFactorType === AuthType.GOOGLE) {
        return this.generateQrCode(user);
      }
      return this.generateOtp(user);
    } catch (err: any) {
      throw new HttpException(err.message, err.status);
    }
  }

  async verify2faToken(token: string, user: User): Promise<any> {
    // select the most recently created 2fa  entity

    const isToken: TwoFactorAuth =
      await this.twoFactorAuthRepository.findOneOrFail({
        where: { user: { id: user.id } },
        relations: ['user'],
        select: ['id', 'secret'],
      });

    return this.authenticator.verifyTwoFactorToken(token, isToken.secret);
  }

  public async signinWith2fa(user: User): Promise<any> {
    return new SuccessResponse(user, 'Signin successful');
  }
}
