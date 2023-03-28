import {
  Controller,
  Post,
  Body,
  UseGuards,
  HttpCode,
  Get,
  Res,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { Public } from '../../decorators/public.decorator';
import { CurrentUser } from '../../decorators/user.decorator';
import { User } from '../users/entities/user.entity';
import { NotificationService } from './notification.service';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post('fetch-notification')
  @HttpCode(HttpStatus.FOUND)
  fetchNotification(@Body() @CurrentUser() user: User) {
    return this.notificationService.fetchNotification(user);
  }

  @Public()
  @Get('read')
  readNotification( @CurrentUser() user: User, @Param('id') id:string ) {
    return this.notificationService.markNotificationAsRead(id,user);
  }

 
}
