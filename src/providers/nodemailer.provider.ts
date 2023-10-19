import { EmailProvider, MailOptions } from '../types/email';
import { createTransport } from 'nodemailer';
import { ConfigService } from '@nestjs/config';

export class NodemailerProvider implements EmailProvider {
  providerId: 'nodemailer';

  smtpHost: string;
  smtpPort: number;
  smtpEmail: string;
  smtpPassword: string;
  fromEmail: string;
  fromName: string;
  nodeEnv: string;

  constructor(private readonly configService: ConfigService) {
    this.smtpHost = configService.get<string>('smtpHost');
    this.smtpPort = configService.get<number>('smtpPort');
    this.smtpEmail = configService.get<string>('smtpEmail');
    this.smtpPassword = configService.get<string>('smtpPassword');
    this.fromEmail = configService.get<string>('fromEmail');
    this.fromName = configService.get<string>('fromName');
    this.nodeEnv = configService.get<string>('nodeEnv');
  }

  async sendMail(options: MailOptions) {
    const transporter = createTransport({
      host: this.smtpHost,
      port: this.smtpPort,
      secure: this.nodeEnv === 'production',
      auth: {
        user: this.smtpEmail,
        pass: this.smtpPassword,
      },
      tls: {
        rejectUnauthorized: this.nodeEnv === 'production',
      },
    });

    const message = {
      from: `${options.fromName ? options.fromName : this.fromName} <${
        options.fromEmail ? options.fromEmail : this.fromEmail
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
