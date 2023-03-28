import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../users/entities/user.entity';
import { Notification } from './entities/notification.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Status } from 'src/types/notification';
import { CreateNotificationDto } from './entities/dto/notification.dto';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notification)
    private readonly notificationRepository: Repository<Notification>,
  ) {}

  public async fetchNotification(
    user: User,
  ): Promise<Notification[] | HttpException> {
    try {
      return await this.notificationRepository.find({
        where: { user: { id: user.id } },
      });
    } catch (err: any) {
      throw new HttpException(err.message, err.status);
    }
  }

  public async createNotification(
    user: User,
    payload: CreateNotificationDto,
  ): Promise<Notification | HttpException> {
    try {
      const notification = this.notificationRepository.create({
        ...payload,
        user,
      });
      return await this.notificationRepository.save(notification);
    } catch (err: any) {
      throw new HttpException(err.message, err.status);
    }
  }
  
  public async markNotificationAsRead(
    id: string,
    user: User,
  ): Promise<Notification | HttpException> {
    try {
      const notification = await this.notificationRepository.findOne({
        where: { id, user: { id: user.id } },
      });

      if (!notification) {
        return new NotFoundException(
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
