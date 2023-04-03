import { HttpException, Injectable } from '@nestjs/common';
import * as firebase from 'firebase-admin';
import { FireBaseProvider, Payload } from 'src/types/firebase';
import { ConfigService } from '@nestjs/config';
import {
  Message,
  MulticastMessage,
} from 'firebase-admin/lib/messaging/messaging-api';
import { NotificationService } from 'src/app/notification/notification.service';
import { User } from 'src/app/users/entities/user.entity';
import * as firebaseCredentials from '../assets/data/firebase_adminsdk.json';
import { ServiceAccount } from 'firebase-admin';

@Injectable()
export class PushNotification implements FireBaseProvider {
  private admin: typeof firebase;

  constructor(private readonly configService: ConfigService) {
    this.admin = firebase;
    this.admin.initializeApp({
      credential: firebase.credential.cert(
        firebaseCredentials as ServiceAccount,
      ),
      databaseURL: configService.get('firebaseDatabaseUrl'),
    });
  }

  public async sendPushNotification(token: string, message: Payload) {
    const payload = {
      title: message.title,
      message: message.body,
    };

    const pushMessage: Message = {
      notification: {
        title: message.title,
        body: message.body,
        imageUrl: '',
      },
      token,
      android: { priority: 'high' },
    };

    try {
      await this.admin.messaging().send(pushMessage, true);
    } catch (err) {
      return new HttpException(err.message, err.status);
    }
  }

  public async sendManyPushNotification(tokens: string[], message: Payload) {
    const pushMessage: MulticastMessage = {
      notification: {
        title: message.title,
        body: message.body,
        imageUrl: '',
      },
      tokens,
      android: { priority: 'high' },
    };

    try {
      return firebase.messaging().sendMulticast(pushMessage, true);
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }
}
