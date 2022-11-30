
export type EmailProviderId = 'nodemailer';

export interface MailOptions {
  fromName?: string;
  fromEmail?: string;
  to: string | string[];
  subject: string;
  message: string;
  html?: string;
}

export interface MailResponse {
  messageId: string;
}

export interface EmailProvider {
  providerId: EmailProviderId;
  sendMail: (mailOptions: MailOptions) => Promise<MailResponse>;

}
