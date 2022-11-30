import { InjectRepository } from '@nestjs/typeorm';
import SendgridService from 'src/utils/sendgrid';
import { EmailTemplate } from '../../types/email';
import { Repository } from 'typeorm';
import { Injectable, HttpException } from '@nestjs/common';
import { ContactUsDto } from './dto/contact.dto';
import { Contact } from './entities/contact.entity';
import configuration from 'src/config/configuration';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(Contact)
    private readonly contactRepository: Repository<Contact>,
  ) {}

  public async sendMessage(
    payload: ContactUsDto,
  ): Promise<Contact | undefined> {
    const config = configuration();

    try {
      await SendgridService.sendgridMail(
        [config.fromEmail],
        EmailTemplate.CONTACT_US,
        {
          contact_us: payload.message,
        },
        payload.email,
      );

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
