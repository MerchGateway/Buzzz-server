import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/app/users/entities/user.entity';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { SignupUserDto } from './dto/signup-user.dto';
import { SuccessResponse } from '../../utils/response';
import { JwtPayload } from './guards/jwt.strategy';
import { IdentityProvider } from '../../types/user';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { WinstonLoggerService } from 'src/logger/winston-logger/winston-logger.service';
import { EmailProvider } from '../../types/email';

import { PasswordReset } from './entities/password-reset.entity';
import { EMAIL_PROVIDER, PASSWORD_RESET_TOKEN_EXPIRY } from '../../constant';

import { ResetPasswordDto } from './dto/reset-password.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { WalletService } from '../wallet/wallet.service';
import { Authtype } from 'src/types/authenticator';
import { TwoFactorAuthService } from '../2fa/twoFactorAuth.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(PasswordReset)
    private readonly passwordResetRepository: Repository<PasswordReset>,
    private readonly logger: WinstonLoggerService,
    @Inject(EMAIL_PROVIDER)
    private emailProvider: EmailProvider,

    private readonly walletService: WalletService,
    private readonly twoFactorAuthService: TwoFactorAuthService,
  ) {
    this.logger.setContext(AuthService.name);
  }

  async validateUser(email: string, enteredPassword: string) {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.email = :email', { email })
      .addSelect('user.password')
      .getOne();

    console.log(user);
    if (!user) {
      return null;
    }

    const isMatch = await user.matchPassword(enteredPassword);
    console.log(isMatch);
    if (!isMatch) {
      return null;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user;

    return result as User;
  }

  async findOauthUser(
    identityProvider: IdentityProvider,
    identityProviderId: string,
  ) {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.identityProvider = :identityProvider', { identityProvider })
      .andWhere('user.identityProviderId = :identityProviderId', {
        identityProviderId,
      })
      .getOne();

    return user;
  }

  async postAdminSignin(user: User) {
    console.log('this is the user', user);
    const payload: JwtPayload = { sub: user.id, role: user.role };
    user.password && delete user.password;
    return {
      user,
      accessToken: this.jwtService.sign(payload),
    };
  }

  async postSignin(user: User) {
    const payload: JwtPayload = { sub: user.id, role: user.role };
    user.password && delete user.password;

    // get refreshed push notification registeration token eachtime on signin to capture possible new device

    if (!user.wallet) {
      const wallet = await this.walletService.createWallet();
      user = await this.userRepository.save({
        ...user,
        wallet,
      });
    }
    return {
      user,
      accessToken: this.jwtService.sign(payload),
    };
  }

  async signin(user: User) {
    const data = await this.postSignin(user);

    if (user.allow2fa == true) {
      // always reset two factor verify status to false on login
      const updatedUserData = await this.userRepository.save({
        ...data.user,
        isTwoFactorVerified: false,
      });

      if (user.twoFactorType === Authtype.INAPP) {
        // send  login token
        await this.twoFactorAuthService.generateOtp(user);
      }
      const tokenLocation =
        user.twoFactorType === Authtype.GOOGLE
          ? 'google authenticator app'
          : 'registered email';

      return new SuccessResponse(
        { ...updatedUserData, accessToken: data.accessToken },
        `Continue sign in by providing an authorization token from your ${tokenLocation} `,
      );
    }
    return new SuccessResponse(data, 'Signin successful');
  }

  async signup(signupUserDto: SignupUserDto) {
    let user: User;

    user = this.userRepository.create(signupUserDto);

    await this.userRepository.save(user);

    const data = await this.postSignin(user);

    return new SuccessResponse(data, 'Signup successful', HttpStatus.CREATED);
  }

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto) {
    const user = await this.userRepository.findOneBy({
      email: forgotPasswordDto.email,
    });

    if (!user) {
      throw new NotFoundException(
        `User with email ${forgotPasswordDto.email} does no exist`,
      );
    }

    const passwordResetToken = await this.findOrCreatePasswordReset(user);

    const resetToken = passwordResetToken.token;

    try {
      await this.emailProvider.sendMail({
        message: `Your password reset token is ${resetToken}`,
        to: forgotPasswordDto.email,
        subject: 'Password Reset',
      });
    } catch (error) {
      this.logger.log(`Error sending email: ${error.message}`);
      throw new HttpException(
        'Unable to send email',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return new SuccessResponse({}, 'Password reset email sent successfully');
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    const passwordReset = await this.passwordResetRepository.findOne({
      where: {
        token: resetPasswordDto.token,
        createdAt: MoreThanOrEqual(
          new Date(Date.now() - PASSWORD_RESET_TOKEN_EXPIRY),
        ),
      },
      relations: { user: true },
    });

    if (!passwordReset) {
      throw new UnauthorizedException('Invalid token');
    }

    const user = passwordReset.user;

    user.password = resetPasswordDto.password;
    await this.userRepository.save(user);

    await this.passwordResetRepository.remove(passwordReset);

    return new SuccessResponse({}, 'Password reset successfully');
  }

  async findOrCreatePasswordReset(user: User) {
    const passwordReset = await this.passwordResetRepository.findOne({
      where: {
        user: { id: user.id },
        createdAt: MoreThanOrEqual(
          new Date(Date.now() - PASSWORD_RESET_TOKEN_EXPIRY),
        ),
      },
    });

    if (passwordReset) {
      return passwordReset;
    }

    const newPasswordReset = this.passwordResetRepository.create({
      user,
    });

    return this.passwordResetRepository.save(newPasswordReset);
  }

  async updatePassword(user: User, updatePasswordDto: UpdatePasswordDto) {
    user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.id = :id', { id: user.id })
      .addSelect('user.password')
      .getOne();

    const isPasswordMatch = await user.matchPassword(
      updatePasswordDto.oldPassword,
    );

    if (!isPasswordMatch) {
      throw new UnauthorizedException('Invalid old password');
    }

    user.password = updatePasswordDto.password;
    await this.userRepository.save(user);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user;

    return new SuccessResponse(
      { user: result },
      'Password updated successfully',
    );
  }

  // admin section

  async adminSignin(user: User) {
    const data = await this.postAdminSignin(user);
    return new SuccessResponse(data, 'Signin successful');
  }
}
