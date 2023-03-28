import { HttpException, Injectable } from '@nestjs/common';
import * as firebase from 'firebase-admin';
import { FireBaseProvider, Payload } from 'src/types/firebase';
import { ConfigService } from '@nestjs/config';
import { Message } from 'firebase-admin/lib/messaging/messaging-api';
import { NotificationService } from 'src/app/notification/notification.service';
import { User } from 'src/app/users/entities/user.entity';

export interface ISendFirebaseMessages {
  token: string;
  title?: string;
  message: string;
}

@Injectable()
export class PushNotification implements FireBaseProvider {
  admin: typeof firebase;

  constructor(
    private readonly configService: ConfigService,
    private readonly notificationService: NotificationService,
  ) {
    const firebaseCredentials = JSON.parse(
      configService.get('firebaseCredentials'),
    );

    this.admin = firebase;

    this.admin.initializeApp({
      credential: firebase.credential.cert(firebaseCredentials),
      databaseURL: configService.get('firebaseDatabaseUrl'),
    });
  }

  public async sendPushNotification(message: Payload, user: User) {
    const payload = {
      title: message.title,
      message: message.body,
      token: message.token,
    };
    const pushMessage: Message = {
      notification: {
        title: message.title,
        body: message.body,
        imageUrl: '',
      },
      token: message.token,
    };

    try {
      await this.admin.messaging().send(pushMessage, true);
      return await this.notificationService.createNotification(user, payload);
    } catch (err) {
      return new HttpException(
        'Oop... something went wrong,could not send out notification',
        err.status,
      );
    }
  }
}
