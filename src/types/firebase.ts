import { HttpException } from '@nestjs/common';
import { Notification } from 'src/app/notification/entities/notification.entity';
import { User } from 'src/app/users/entities/user.entity';

export interface Payload {
  title: string;
  body: string;
  token: string;
}
export interface FireBaseProvider {
  sendPushNotification: (
    options: Payload,
    user: User,
  ) => Promise<Notification | HttpException>;
}
