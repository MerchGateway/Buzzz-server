import { HttpException } from '@nestjs/common';
import { Notification } from 'src/app/notification/entities/notification.entity';
import { User } from 'src/app/users/entities/user.entity';

export interface Payload {
  title: string;
  body: string;
  
 
}
export interface FireBaseProvider {
  sendPushNotification: (
    token:string,
    options: Payload
   
  ) => Promise<Notification | HttpException>;
}
