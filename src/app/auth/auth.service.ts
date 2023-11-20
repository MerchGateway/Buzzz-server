import {
  BadRequestException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
  forwardRef,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/app/users/entities/user.entity';
import {
  FindOptionsSelect,
  FindOptionsWhere,
  MoreThanOrEqual,
  Repository,
} from 'typeorm';
import { SignupUserDto } from './dto/signup-user.dto';
import { SuccessResponse } from '../../utils/response';
import { JwtPayload } from './guards/jwt.strategy';
import { IdentityProvider } from '../../types/user';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { WinstonLoggerService } from 'src/logger/winston-logger/winston-logger.service';
import { DesignService } from '../design/design.service';
import { PasswordReset } from './entities/password-reset.entity';
import { PASSWORD_RESET_TOKEN_EXPIRY } from '../../constant';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { WalletService } from '../wallet/wallet.service';
import { AuthType } from 'src/types/authenticator';
import { TwoFactorAuthService } from '../2fa/twoFactorAuth.service';
import { UsersService } from '../users/users.service';
import { MailService } from '../../mail/mail.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private designService: DesignService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(PasswordReset)
    private readonly passwordResetRepository: Repository<PasswordReset>,
    private readonly logger: WinstonLoggerService,
    private mailService: MailService,
    @Inject(forwardRef(() => WalletService))
    private readonly walletService: WalletService,
    private readonly twoFactorAuthService: TwoFactorAuthService,
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
  ) {
    this.logger.setContext(AuthService.name);
  }

  async validateUser(
    email: string,
    enteredPassword: string,
  ): Promise<User | null> {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.email = :email', { email })
      .addSelect('user.password')
      .leftJoinAndSelect('user.wallet', 'wallet')
      .getOne();

    if (!user) {
      return null;
    }

    const isMatch = await user.matchPassword(enteredPassword);

    if (!isMatch) {
      return null;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user;

    return result as User;
  }

  async findOneUser(
    filter: FindOptionsWhere<User>,
    select?: FindOptionsSelect<User>,
  ) {
    return await this.userRepository.findOne({ where: filter, select });
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
      .leftJoinAndSelect('user.wallet', 'wallet')
      .getOne();

    return user;
  }

  async postAdminSignin(user: User) {
    const payload: JwtPayload = { sub: user.id, role: user.role };
    user.password && delete user.password;

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
      refreshToken: this.jwtService.sign(payload, {
        secret: this.configService.get<string>('jwt.refreshSecret'),
        expiresIn: this.configService.get<string>('jwt.refreshExpiresIn'),
      }),
    };
  }

  async postSignin(user: User, designId?: string) {
    const payload: JwtPayload = { sub: user.id, role: user.role };
    user.password && delete user.password;

    if (!user.wallet) {
      const wallet = await this.walletService.createWallet();
      user = await this.userRepository.save({
        ...user,
        wallet,
      });
    }

    if (designId) {
      // associate design with user
      const design = await this.designService.fetchSingleDesign(designId);
      !design.user && (design.user = user);
      await design.save();
    }

    return {
      user,
      accessToken: this.jwtService.sign(payload),
      refreshToken: this.jwtService.sign(payload, {
        secret: this.configService.get<string>('jwt.refreshSecret'),
        expiresIn: this.configService.get<string>('jwt.refreshExpiresIn'),
      }),
    };
  }

  async signin(user: User, designId?: string) {
    const data = await this.postSignin(user, designId);

    if (user.allow2fa == true) {
      // always reset two factor verify status to false on login
      const updatedUserData = await this.userRepository.save({
        ...data.user,
        isTwoFactorVerified: false,
      });

      if (user.twoFactorType === AuthType.IN_APP) {
        // send  login token
        await this.twoFactorAuthService.generateOtp(user);
      }
      const tokenLocation =
        user.twoFactorType === AuthType.GOOGLE
          ? 'google authenticator app'
          : 'registered email';

      return new SuccessResponse(
        { ...updatedUserData, accessToken: data.accessToken },
        `Continue sign in by providing an authorization token from your ${tokenLocation} `,
      );
    }
    return new SuccessResponse(data, 'Signin successful');
  }

  async socialSignin(user: User, designId?: string) {
    const data = await this.postSignin(user, designId);
    return new SuccessResponse(data, 'Signin successful');
  }

  async signup(signupUserDto: SignupUserDto, designId?: string) {
    const existingUserWithEmail = await this.findOneUser(
      {
        email: signupUserDto.email,
      },
      {
        id: true,
        identityProvider: true,
        identityProviderId: true,
      },
    );

    if (existingUserWithEmail) {
      if (existingUserWithEmail.identityProviderId) {
        const identityProviderString =
          existingUserWithEmail.identityProvider.toLowerCase();
        throw new BadRequestException(
          `It looks like you've already signed up with ${identityProviderString} using this email address. Please sign in with ${identityProviderString} to access your account.`,
        );
      }

      throw new BadRequestException(
        `It looks like you've already signed up with this email address. Please sign in to access your account.`,
      );
    }

    const user = this.userRepository.create(signupUserDto);
    await this.userRepository.save(user);

    const data = await this.postSignin(user, designId);

    return new SuccessResponse(data, 'Signup successful', HttpStatus.CREATED);
  }

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto) {
    const user = await this.userRepository.findOne({
      where: { email: forgotPasswordDto.email },
      select: ['id', 'email', 'firstName', 'username', 'identityProvider'],
    });

    // if (!user) {
    //   throw new NotFoundException(
    //     `User with email ${forgotPasswordDto.email} does not exist.`,
    //   );
    // }
    if (user) {
      if (user.identityProvider) {
        const identityProviderString = user.identityProvider.toLowerCase();
        throw new BadRequestException(
          `It looks like you signed up with your ${identityProviderString} account using this email address. Please sign in with ${identityProviderString} to access your account.`,
        );
      }

      const passwordResetToken = await this.findOrCreatePasswordReset(user);

      await this.mailService.sendResetPassword(user, passwordResetToken.token);
    }

    return new SuccessResponse(
      {},
      `If you  previously registered with email ${forgotPasswordDto.email} you will recieve a mail with a reset password link`,
    );
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
      throw new BadRequestException('Invalid token');
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

  async adminSignin(user: User) {
    const data = await this.postAdminSignin(user);
    return new SuccessResponse(data, 'Signin successful');
  }

  findAuthUser(id: string) {
    return this.usersService.findOneProfile(id);
  }

  async sendEmailVerification(user: User) {
    const emailVerificationToken =
      await this.usersService.generateEmailVerificationToken();

    await this.mailService.sendEmailVerification(user, emailVerificationToken);

    await this.userRepository.update(user.id, {
      emailVerificationToken,
    });

    return new SuccessResponse(
      {},
      'Email verification sent successfully. Please check your email',
    );
  }

  async verifyEmail(verificationToken: string) {
    const user = await this.userRepository.findOne({
      where: { emailVerificationToken: verificationToken },
    });

    if (!user) {
      throw new BadRequestException('Invalid verification token');
    }

    await this.userRepository.update(user.id, {
      emailVerified: true,
      emailVerificationToken: null,
    });

    return new SuccessResponse(null, 'Email verified successfully');
  }

  async refreshToken(refreshToken: string) {
    let userId: string;

    try {
      const { sub: payloadSub } = this.jwtService.verify(refreshToken, {
        secret: this.configService.get<string>('jwt.refreshSecret'),
      });
      userId = payloadSub;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }

    const user = await this.userRepository.findOneBy({ id: userId });

    if (!user) {
      throw new UnauthorizedException('Invalid token');
    }

    const res = await this.postSignin(user);

    return new SuccessResponse(res, 'Token refreshed successfully');
  }
}
