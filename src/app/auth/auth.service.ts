import {
  HttpException,
  HttpStatus,
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
import SendgridService from 'src/utils/sendgrid';
import { WinstonLoggerService } from 'src/logger/winston-logger/winston-logger.service';
import { EmailTemplate } from '../../types/email';
import { PasswordReset } from './entities/password-reset.entity';
import { PASSWORD_RESET_TOKEN_EXPIRY } from '../../constant';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(PasswordReset)
    private readonly passwordResetRepository: Repository<PasswordReset>,
    private readonly logger: WinstonLoggerService,
  ) {
    this.logger.setContext(AuthService.name);
  }

  async validateUser(email: string, enteredPassword: string) {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.email = :email', { email })
      .addSelect('user.password')
      .getOne();

    if (!user) {
      return null;
    }

    const isMatch = await user.matchPassword(enteredPassword);

    if (!isMatch) {
      return null;
    }

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

  postSignin(user: User) {
    const payload: JwtPayload = { sub: user.id, role: user.role };

    user.password && delete user.password;

    return {
      user,
      accessToken: this.jwtService.sign(payload),
    };
  }

  signin(user: User) {
    const data = this.postSignin(user);

    return new SuccessResponse(data, 'Signin successful');
  }

  async signup(signupUserDto: SignupUserDto) {
    const user = this.userRepository.create(signupUserDto);
    await this.userRepository.save(user);

    const data = this.postSignin(user);

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
      await SendgridService.sendgridMail(
        [forgotPasswordDto.email],
        EmailTemplate.FORGOT_PASSWORD,
        { token: resetToken },
      );
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
}
