import { HttpException, Injectable } from '@nestjs/common';
import * as firebase from 'firebase-admin';
import { FireBaseProvider, Payload } from 'src/types/firebase';
import { ConfigService } from '@nestjs/config';
import {
  Message,
  MulticastMessage,
} from 'firebase-admin/lib/messaging/messaging-api';
import * as firebaseCredentials from '../assets/data/firebase_adminsdk.json';
import { ServiceAccount } from 'firebase-admin';
import { readFileSync } from 'fs';
import { resolve } from 'path';

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
    // console.log(resolve(__dirname, '../assets/images/logo.svg'));
    

    const pushMessage: Message = {
      notification: {
        title: message.title,
        body: message.body,
        imageUrl: this.configService.get('firebase_image_url'),
      },
      token,
      android: { priority: 'high' },
    };

    try {
      const sent = await this.admin.messaging().send(pushMessage);
      console.log(token,sent);
    } catch (err) {
      console.log(err)
      return new HttpException(err.message, err.status);
    }
  }

  public async sendManyPushNotification(tokens: string[], message: Payload) {
    const pushMessage: MulticastMessage = {
      notification: {
        title: message.title,
        body: message.body,
        imageUrl: resolve(__dirname, 'src/assets/images/logo.svg'),
      },
      tokens,
      android: { priority: 'high' },
    };
    
    try {
      return this.admin.messaging()
        .sendMulticast(pushMessage);
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }
}
