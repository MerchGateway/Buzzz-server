import { Module } from '@nestjs/common';
import { ContactController } from './contact.controller';
import { ContactService } from './contact.service';
import { Contact } from './entities/contact.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailModule } from '../../mail/mail.module';

@Module({
  imports: [TypeOrmModule.forFeature([Contact]), MailModule],
  controllers: [ContactController],
  providers: [ContactService],
  exports: [ContactService],
})
export class ContactModule {}
