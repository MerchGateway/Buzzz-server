import { InjectRepository } from '@nestjs/typeorm';
import SendgridService from 'src/utils/sendgrid';
import { EMAIL_PROVIDER, PASSWORD_RESET_TOKEN_EXPIRY } from '../../constant';
import { EmailProvider } from '../../types/email';
import { Repository } from 'typeorm';
import { Injectable, HttpException, Inject } from '@nestjs/common';
import { ContactUsDto } from './dto/contact.dto';
import { Contact } from './entities/contact.entity';
import configuration from 'src/config/configuration';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(Contact)
    private readonly contactRepository: Repository<Contact>,
    @Inject(EMAIL_PROVIDER)
    private emailProvider: EmailProvider,
  ) {}

  public async sendMessage(
    payload: ContactUsDto,
  ): Promise<Contact | undefined> {
    const config = configuration();

    try {
      await this.emailProvider.sendMail({
        message: payload.message,
        to: config.fromEmail,
        fromEmail: payload.email,
        subject: ' Contact Us',
      });

      const message = this.contactRepository.create({
        email: payload.email,
        message: payload.message,
      });
      return await message.save();
    } catch (err: any) {
      throw new HttpException(err.message, err.status);
    }
  }

  public async getAllMessages(): Promise<Contact[] | undefined> {
    try {
      const messages = await this.contactRepository.find();
      return messages;
    } catch (err: any) {
      throw new HttpException(err.message, err.status);
    }
  }
}
