import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { ConfigService } from '@nestjs/config';
import { MailService } from './mail.service';
import { join } from 'path';

@Module({
  imports: [
    MailerModule.forRootAsync({
      // imports: [ConfigModule], // import module if not enabled globally
      useFactory: async (config: ConfigService) => ({
        // transport: config.get("MAIL_TRANSPORT"),
        // or
        transport: {
          host: config.get('smtpHost'),
          port: config.get('smtpPort'),
          secure: config.get('nodeEnv') === 'production',
          auth: config.get('nodeEnv') === 'production' && {
            user: config.get('smtpEmail'),
            pass: config.get('smtpPassword'),
          },
          tls: {
            rejectUnauthorized: config.get('nodeEnv') === 'production',
          },
        },
        defaults: {
          from: `"${config.get('fromName')}" <${config.get('fromEmail')}>`,
        },
        template: {
          dir: join(__dirname, 'templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
