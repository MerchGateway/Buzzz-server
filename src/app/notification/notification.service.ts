import {
  HttpException,
  Inject,
  Injectable,
  BadRequestException,
  NotFoundException,
  HttpStatus,
} from '@nestjs/common';
import { User } from '../users/entities/user.entity';
import { Notification } from './entities/notification.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull, Not } from 'typeorm';
import { Status } from 'src/types/notification';
import {
  CreateNotificationDto,
  CreateMultipleNotificationDto,
} from './entities/dto/notification.dto';
import { TurnOnPushNotificationDto } from './entities/dto/turn-on-push-notification.dto';
import { SuccessResponse } from 'src/utils/response';
import { PUSH_NOTIFICATION } from 'src/constant';
import { PushNotification } from 'src/providers/firebase-push-notification.provider';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notification)
    private readonly notificationRepository: Repository<Notification>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @Inject(PUSH_NOTIFICATION)
    private pushNotificationProvider: PushNotification,
  ) {}

  public async fetchNotification(
    user: User,
  ): Promise<Notification[] | HttpException> {
    try {
      return await this.notificationRepository.find({
        where: { user: { id: user.id },
       },
        order:{created_at:"DESC"}
      })
    } catch (err: any) {
      throw new HttpException(err.message, err.status);
    }
  }

  private async getUserWithRegisterationToken(
    email: string,
  ): Promise<User | undefined> {
    try {
      const userWithToken = await this.userRepository.findOne({
        where: { email  },
        select: ['id','registerationToken',"allowNotification"],
      });


      if (!userWithToken) {
        return;
      }
      return userWithToken;
    } catch (err: any) {
      throw new HttpException(err.message, err.status);
    }
  }

  public async createNotification(
    payload: CreateNotificationDto,
  ): Promise<Notification> {
    try {
      const isRegisteredToken = await this.getUserWithRegisterationToken(
        payload.email,
      );
     

      if(!isRegisteredToken){
        throw new NotFoundException(`User  with provided email ${payload.email} not  found`)
      }
      const notification = this.notificationRepository.create({
        title: payload.title,
        message: payload.message,
        user: { id: isRegisteredToken.id },
      });

      const savedNotifications = await this.notificationRepository.save(
        notification,
      );
      console.log(notification);

      if (isRegisteredToken &&  isRegisteredToken.allowNotification==true ) {
        // send push notification

        this.pushNotificationProvider.sendPushNotification(
          isRegisteredToken.registerationToken,
          { title: payload.title, body: payload.message },
        );
      }
      return savedNotifications;
    } catch (err: any) {
      throw new HttpException(err.message, err.status);
    }
  }

  public async createMultipleNotifications(
    payload: CreateMultipleNotificationDto,
    query: any,
  ): Promise<Notification[]> {
    try {
      const tokens = [];
      const createNotificationBody = [];

      const users = await this.userRepository.find({
        where: {
          ...query,
          allowNotification: true,
          registerationToken: Not(IsNull()),
        },
        select: ['registerationToken'],
      });

      // compute registeration token

      await Promise.all(
        users.map(async (data) => {
          tokens.push(data.registerationToken);

          createNotificationBody.push({
            title: payload.title,
            message: payload.message,
            user: { id: data.id },
          });
        }),
      );

      // create app notification record
      const notifications = this.notificationRepository.create(
        createNotificationBody,
      );

      const savedNotifications = await this.notificationRepository.save(
        notifications,
      );

      await this.pushNotificationProvider.sendManyPushNotification(tokens, {
        title: payload.title,
        body: payload.message,
      });

      return savedNotifications;
    } catch (err: any) {
      throw new HttpException(err.message, err.status);
    }
  }

  
  public async refreshRegisterationToken(
    user: User,
    payload: TurnOnPushNotificationDto,
  ): Promise<any> {
    try {
      if (user.allowNotification == false) {
        throw new HttpException(
          'Please turn on allow notification',
          HttpStatus.NOT_ACCEPTABLE,
        );
      }
      await this.userRepository.save({
        ...user,
        registerationToken: payload.registerationToken,
      });
      return new SuccessResponse(
        {},
        'Notification registeration token set successfully',
      );
    } catch (err: any) {
      throw new HttpException(err.message, err.status);
    }
  }

  public async turnOnNotification(
    user: User,
    payload: TurnOnPushNotificationDto,
  ): Promise<any> {
    try {
      await this.userRepository.save({
        ...user,
        registerationToken: payload.registerationToken,
        allowNotification: true,
      });
      return new SuccessResponse(
        { allowNotification: true },
        'Notification turned on successfully',
      );
    } catch (err: any) {
      throw new HttpException(err.message, err.status);
    }
  }

  public async markNotificationAsRead(
    id: string,
    user: User,
  ): Promise<Notification> {
    try {
      const notification = await this.notificationRepository.findOne({
        where: { id, user: { id: user.id } },
      });

      if (!notification) {
        throw new NotFoundException(
          `Notification with id '${id}' does not exist`,
        );
      }
      notification.status = Status.READ;
      return await this.notificationRepository.save(notification);
    } catch (err: any) {
      throw new HttpException(err.message, err.status);
    }
  }
}
