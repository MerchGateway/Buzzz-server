import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { ContactUsDto } from './dto/contact.dto';
import { Contact } from './entities/contact.entity';
import { MailService } from '../../mail/mail.service';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(Contact)
    private readonly contactRepository: Repository<Contact>,
    private readonly mailService: MailService,
  ) {}

  public async sendMessage(
    contactUsDto: ContactUsDto,
  ): Promise<Contact | undefined> {
    await this.mailService.sendContactUs(contactUsDto);

    const message = this.contactRepository.create({
      email: contactUsDto.email,
      message: contactUsDto.message,
    });

    return await message.save();
  }

  public async getAllMessages() {
    return await this.contactRepository.find();
  }
}
