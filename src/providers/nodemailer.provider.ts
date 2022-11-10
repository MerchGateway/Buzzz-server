import { EmailProvider, MailOptions } from '../types/email';
import { createTransport } from 'nodemailer';
import { ConfigService } from '@nestjs/config';

export class NodemailerProvider implements EmailProvider {
  providerId: 'nodemailer';

  smtpHost: string;
  smtpPort: number;
  smtpEmail: string;
  smtpPassword: string;

  constructor(private readonly configService: ConfigService) {
    this.smtpHost = configService.get<string>('smtpHost');
    this.smtpPort = configService.get<number>('smtpPort');
    this.smtpEmail = configService.get<string>('smtpEmail');
    this.smtpPassword = configService.get<string>('smtpPassword');
  }

  async sendMail(options: MailOptions) {
    const transporter = createTransport({
      host: this.smtpHost,
      port: this.smtpPort,
      secure: false,
      auth: {
        user: this.smtpEmail,
        pass: this.smtpPassword,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const message = {
      from: `${
        options.fromName ? options.fromName : process.env.MAIL_FROM_NAME
      } <${
        options.fromEmail ? options.fromEmail : process.env.MAIL_FROM_EMAIL
      }>`,
      to: options.to,
      subject: options.subject,
      text: options.message,
      html: options.html ? options.html : null,
    };

    const info = await transporter.sendMail(message);

    return { messageId: info.messageId };
  }
}