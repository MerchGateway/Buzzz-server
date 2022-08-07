import sgMail from '@sendgrid/mail';
import configuration from 'src/config/configuration';

const config = configuration();

export default class SendgridService {
  public static async sendgridMail(
    emails: [string],
    templateId: string,
    dynamicTemplateData: { [key: string]: any },
  ) {
    sgMail.setApiKey(config.sendgridApiKey);

    const msg: sgMail.MailDataRequired = {
      to: emails,
      from: config.fromEmail,
      templateId,
      dynamicTemplateData,
    };

    sgMail.send(msg, undefined, (err: any) => {
      if (err) {
        console.log({
          error: true,
          message: 'Unable to send email',
          data: err,
        });
      }
    });
  }

  //postmark mail here
}
