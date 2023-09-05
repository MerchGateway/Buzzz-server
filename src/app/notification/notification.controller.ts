import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Query,
  Get,
} from '@nestjs/common';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/types/general';
import { Public } from '../../decorators/public.decorator';
import { CurrentUser } from '../../decorators/user.decorator';
import { User } from '../users/entities/user.entity';
import {
  CreateNotificationDto,
  CreateMultipleNotificationDto,
} from './entities/dto/notification.dto';
import { TurnOnPushNotificationDto } from './entities/dto/turn-on-push-notification.dto';
import { NotificationService } from './notification.service';
CreateNotificationDto;

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get('fetch-notification')
  @HttpCode(HttpStatus.FOUND)
  fetchNotification(@CurrentUser() user: User) {
    return this.notificationService.fetchNotification(user);
  }

  
  @Patch('turn-on')
  @HttpCode(HttpStatus.ACCEPTED)
  turnOnNotification(
    @Body() payload: TurnOnPushNotificationDto,
    @CurrentUser() user: User,
  ) {
    return this.notificationService.turnOnNotification(user, payload);
  }

  @Patch('refresh-registeration-token')
  @HttpCode(HttpStatus.ACCEPTED)
  refreshRegisterationToken(
    @Body() payload: TurnOnPushNotificationDto,
    @CurrentUser() user: User,
  ) {
    return this.notificationService.refreshRegisterationToken(user, payload);
  }

  @Post('create-notification')
  @Roles(Role.ADMIN, Role.SUPER_ADMIN, Role.PUBLISHER,Role.USER)
  @HttpCode(HttpStatus.CREATED)
  createNotification(@Body() payload: CreateNotificationDto) {
    return this.notificationService.createNotification(payload);
  }


  @Post('create-multiple-notifications')
  @Roles(Role.ADMIN, Role.SUPER_ADMIN, Role.PUBLISHER)
  @HttpCode(HttpStatus.CREATED)
  createMultipleNotification(
    @Query() query:any,
    @Body() payload: CreateMultipleNotificationDto,
  ) {
    return this.notificationService.createMultipleNotifications(payload,query);
  }

  @Patch('read')
  readNotification(@CurrentUser() user: User, @Param('id') id: string) {
    return this.notificationService.markNotificationAsRead(id, user);
  }
}
