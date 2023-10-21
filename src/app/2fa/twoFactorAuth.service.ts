import { Injectable, HttpException, Inject, HttpStatus } from '@nestjs/common';

import { Toggle2faDto } from './dto/toggle2fa.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TwoFactorAuth } from './entities/twoFactorAuth.entity';
import { User } from '../users/entities/user.entity';
import { AUTHENTICATOR, QRCODE } from 'src/constant';
import { AuthenticatorProvider } from 'src/types/authenticator';
import { QrcodeProvider } from 'src/types/qrcode';
import { SuccessResponse } from 'src/utils/response';
import { AuthType } from 'src/types/authenticator';
import { MailService } from '../../mail/mail.service';

@Injectable()
export class TwoFactorAuthService {
  constructor(
    @InjectRepository(TwoFactorAuth)
    private readonly twoFactorAuthRepository: Repository<TwoFactorAuth>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @Inject(AUTHENTICATOR) private authenticator: AuthenticatorProvider,
    @Inject(QRCODE) private qrcode: QrcodeProvider,
    private readonly mailService: MailService,
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

  async generateOtp(user: User) {
    const twoFaSecret =
      await this.authenticator.generateTwoFactorAuthenticationSecret(user);

    const otp = this.authenticator.generate(twoFaSecret.secret);

    const twoFactorAuthData = new TwoFactorAuth();
    twoFactorAuthData.user = user;
    twoFactorAuthData.secret = twoFaSecret.secret;

    await this.twoFactorAuthRepository.save(twoFactorAuthData);

    await this.mailService.sendLoginOtp(user, otp);

    return new SuccessResponse({}, 'OTP sent to registered email');
  }

  private async generateQrCode(user: User): Promise<{ qrcode: any }> {
    const twoFaSecret =
      await this.authenticator.generateTwoFactorAuthenticationSecret(user);

    const qrcodeDataUrl = await this.qrcode.generateQrCodeDataURL(
      twoFaSecret.otpAuthUrl,
    );

    const generatedQrData: TwoFactorAuth = this.twoFactorAuthRepository.create({
      user,
      secret: twoFaSecret.secret,
    });

    await this.twoFactorAuthRepository.save(generatedQrData);

    //  return a qrcode image url to client (png)
    return { qrcode: qrcodeDataUrl };
  }

  public async initialize2fa(user: User): Promise<any> {
    // ensure 2fa is turned uon
    if (user.allow2fa == false) {
      await this.userRepository.save({
        ...user,
        allow2fa: true,
        isTwoFactorVerified: false,
      });
    }

    if (user.twoFactorType === AuthType.GOOGLE) {
      return this.generateQrCode(user);
    }
    return this.generateOtp(user);
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
