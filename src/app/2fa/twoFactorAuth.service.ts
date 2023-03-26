import {
  Injectable,
  HttpException,
  UnauthorizedException,
  Inject,
  HttpStatus,
} from '@nestjs/common';
import { totp } from 'otplib';
import { toFileStream } from 'qrcode';
import { Toggle2faDto } from './dto/toggle2fa.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TwoFactorAuth } from './entities/twoFactorAuth.entity';
import { User } from '../users/entities/user.entity';
import { AUTHENTICATOR, QRCODE } from 'src/constant';
import { AuthenticatorProvider } from 'src/types/authenticator';
import { QrcodeProvider } from 'src/types/qrcode';
import { JwtPayload } from '../auth/guards/jwt.strategy';
import { WalletService } from '../wallet/wallet.service';
import { JwtService } from '@nestjs/jwt';
import { EMAIL_PROVIDER } from '../../constant';
import { EmailProvider } from '../../types/email';
import { SuccessResponse } from 'src/utils/response';
import { Authtype } from 'src/types/authenticator';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class twoFactorAuthService {
  constructor(
    private jwtService: JwtService,
    private authService: AuthService,
    @InjectRepository(TwoFactorAuth)
    private readonly twoFactorAuthRepository: Repository<TwoFactorAuth>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly walletService: WalletService,
    @Inject(AUTHENTICATOR) private authenticator: AuthenticatorProvider,
    @Inject(QRCODE) private qrcode: QrcodeProvider,
    @Inject(EMAIL_PROVIDER)
    private emailProvider: EmailProvider,
  ) {}

  public async toggle2fa(
    payload: Toggle2faDto,
    user: User,
  ): Promise<User | undefined> {
    try {
      return this.userRepository.save({
        ...user,
        twoFactorAuthentication: {
          allow2fa: payload.allow2fa,
        },
      });
    } catch (err: any) {
      throw new HttpException(err.message, err.status);
    }
  }

  private async generateOtp(user: User): Promise<any | undefined> {
    try {
      const twoFaSecret =
        await this.authenticator.generateTwoFactorAuthenticationSecret(user);

      const token = this.authenticator.generate(twoFaSecret.secret);

      const twoFactorAuthData = this.twoFactorAuthRepository.create({
        user,
        secret: twoFaSecret.secret,
      });

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

  private async generateQrCode(
    user: User,
    stream: Response,
  ): Promise<User | undefined> {
    try {
      const twoFaSecret =
        await this.authenticator.generateTwoFactorAuthenticationSecret(user);

      const qrcodeDataUrl = await this.qrcode.generateQrCodeDataURL(
        twoFaSecret.otpauthUrl,
      );

      const generatedQrData: TwoFactorAuth =
        this.twoFactorAuthRepository.create({
          user,
          secret: twoFaSecret.secret,
          twofactorUri: twoFaSecret.otpauthUrl,
          twofactorQrCode: qrcodeDataUrl,
        });

      await this.twoFactorAuthRepository.save(generatedQrData);
      //  return a qrcode image to client (png)
      return this.qrCodeStreamPipe(stream, qrcodeDataUrl);
    } catch (err: any) {
      throw new HttpException(err.message, err.status);
    }
  }

  public async initialize2fa(
    user: User,
    stream: Response,
  ): Promise<any | undefined> {
    try {
      if (user.twoFactorAuthentication.type === Authtype.GOOGLE) {
        return this.generateQrCode(user, stream);
      }
      return this.generateOtp(user);
    } catch (err: any) {
      throw new HttpException(err.message, err.status);
    }
  }

  async verify2faToken(token: string, user: User) {
    // select the most recently created 2fa  entity
    const isToken: TwoFactorAuth = await this.twoFactorAuthRepository.findOne({
      where: { user: { id: user.id } },
      relations: { user: true },
      select: ['secret'],
    });

    // if there hasnt been any record of 2fa,decline them access to proceed
    if (!isToken) {
      return new UnauthorizedException();
    }

    return this.authenticator.verifyTwoFactorToken(token, isToken.secret);
  }

  public async qrCodeStreamPipe(stream: Response, otpPathUrl: string) {
    return toFileStream(stream, otpPathUrl);
  }

  public async signinWith2fa(user: User) {
    if (
      user.twoFactorAuthentication.allow2fa &&
      user.twoFactorAuthentication.isTwoFactorVerified == false
    ) {
      return new UnauthorizedException('Invalid credentials');
    }

    return this.authService.signin(user);
  }
}
