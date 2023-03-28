import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notification } from './entities/notification.entity';
import { PUSH_NOTIFICATION } from 'src/constant';
import { PushNotification } from 'src/providers/firebase-push-notification.provider';
import { ConfigService } from '@nestjs/config';
import * as firebase from 'firebase-admin';

@Module({
  imports: [TypeOrmModule.forFeature([Notification])],
  providers: [
    NotificationService,
    {
      provide: PUSH_NOTIFICATION,
      useFactory: (
        configService: ConfigService,
        notificationService: NotificationService
      ) => {
        return new PushNotification(configService, notificationService);
      },
      inject: [ConfigService, NotificationService],
    },
  ],
  controllers: [NotificationController],
  exports: [NotificationService],
})
export class NotificationModule {}
