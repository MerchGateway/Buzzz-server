import {
  Body,
  Controller,
  Post,
  Get,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/types/general';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Public } from 'src/decorators/public.decorator';
import { ContactService } from './contact.service';
import { ContactUsDto } from './dto/contact.dto';
import { Contact } from './entities/contact.entity';

@Controller('contact-us')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Public()
  @Post('')
  @HttpCode(HttpStatus.CREATED)
  private sendMessage(
    @Body() payload: ContactUsDto,
  ): Promise<Contact | undefined> {
    return this.contactService.sendMessage(payload);
  }

  @Get('')
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  @UseGuards(RolesGuard)
  private getAllmessages(): Promise<Contact[] | undefined> {
    return this.contactService.getAllMessages();
  }
}
