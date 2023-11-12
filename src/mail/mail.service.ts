import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { User } from '../app/users/entities/user.entity';
import { ConfigService } from '@nestjs/config';
import { ContactUsDto } from '../app/contact/dto/contact.dto';
import { OTP } from '../app/otp/entities/otp.entity';
import { OTPReasonText } from '../types/otp';
import { Order } from '../app/order/entities/order.entity';

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

  async sendBuyerOrderConfirmation(buyer: User, order: Order) {
    await this.mailerService.sendMail({
      from: `"Tonia from Buzzz💜" <${this.configService.get<string>(
        'fromEmail',
      )}>`,
      to: buyer.email,
      subject: 'Thanks for Your Order with Buzzz! 🐝',
      template: './buyerOrderConfirmation',
      context: {
        name: buyer.firstName || buyer.username,
        email: buyer.email,
        orderId: order.id,
        orderCount: order.quantity,
      },
    });
  }

  async sendSellerOrderConfirmation(seller: User, order: Order) {
    await this.mailerService.sendMail({
      to: seller.email,
      subject: 'New Order Alert!',
      template: './sellerOrderConfirmation',
      context: {
        name: seller.firstName || seller.username,
        email: seller.email,
        orderId: order.id,
      },
    });
  }

  async sendEmailVerification(user: User, verificationToken: string) {
    const url = `${this.configService.get<string>(
      'clientUrl',
    )}/auth/verify-email?token=${verificationToken}`;

    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Verify Email',
      template: './verifyEmail',
      context: {
        url,
        name: user.firstName || user.username,
        email: user.email,
      },
    });
  }
}