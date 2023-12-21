import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notification } from './entities/notification.entity';

import { ConfigService } from '@nestjs/config';
import { PushNotification } from 'src/providers/firebasePushNotificationProvider';
import { PUSH_NOTIFICATION } from 'src/constant';

import { User } from '../users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Notification, User])],
  providers: [
    NotificationService,
    {
      provide: PUSH_NOTIFICATION,
      useFactory: (configService: ConfigService) => {
        return new PushNotification(configService);
      },
      inject: [ConfigService],
    },
  ],
  controllers: [NotificationController],
  exports: [NotificationService],
})
export class NotificationModule {}
