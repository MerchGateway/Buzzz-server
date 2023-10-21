import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { User } from '../app/users/entities/user.entity';
import { ConfigService } from '@nestjs/config';
import { ContactUsDto } from '../app/contact/dto/contact.dto';
import { OTP } from '../app/otp/entities/otp.entity';
import { OTPReasonText } from '../types/otp';

@Injectable()
export class MailService {
  constructor(
    private mailerService: MailerService,
    private configService: ConfigService,
  ) {}

  async sendResetPassword(user: User, resetToken: string) {
    const url = `${this.configService.get<string>(
      'clientUrl',
    )}/auth/forgot-password/reset?token=${resetToken}`;

    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Password Reset',
      template: './forgotPassword',
      context: {
        url,
        name: user.firstName || user.username,
        email: user.email,
      },
    });
  }

  async sendContactUs(contactUsDto: ContactUsDto) {
    await this.mailerService.sendMail({
      from: contactUsDto.email,
      to: this.configService.get<string>('fromEmail'),
      subject: 'Contact Message',
      template: './contactUs',
      context: {
        message: contactUsDto.message,
        from: contactUsDto.email,
      },
    });
  }

  async sendLoginOtp(user: User, otp: string) {
    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Login OTP',
      template: './otp',
      context: {
        otpReason: 'Login',
        otp,
        name: user.firstName || user.username,
        email: user.email,
      },
    });
  }

  async sendOtp(user: User, otp: OTP) {
    await this.mailerService.sendMail({
      to: user.email,
      subject: `${OTPReasonText[otp.reason]} OTP`,
      template: './otp',
      context: {
        otpReason: OTPReasonText[otp.reason],
        otp: otp.code,
        name: user.firstName || user.username,
        email: user.email,
      },
    });
  }
}
