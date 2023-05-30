import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { LogisticsPartner } from '../logistics-partners/entities/logistics-partner.entity';
import { User } from 'src/app/users/entities/user.entity';
import { HttpException } from '@nestjs/common';
import { Order } from 'src/app/order/entities/order.entity';
import { OrderService } from 'src/app/order/order.service';
import { UnauthorizedException } from '@nestjs/common';
import { Status } from 'src/types/order';

@Injectable()
export class LogisticsPartnerService {
  constructor(
    @InjectRepository(LogisticsPartner)
    private readonly logisticsPartnerRepository: Repository<LogisticsPartner>,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly orderService: OrderService,
  ) {}

  async getOrders(user: User) {
    try {
      const orders = await this.logisticsPartnerRepository.findOneBy({
        id: user.logistics_partner.id,
      });

      return orders.orders;
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }

  async updateStatus(user: User, body: { status: Status }, id: string) {
    try {
      const allowedStatuses = ['Sent-for-delievery', 'Delievered'];

      if (!allowedStatuses.includes(body.status)) {
        return new UnauthorizedException(
          'Logistics partner  only allowed  to set status  to "Sent-for-delievery" or "Delievered" ',
        );
      }

      const order = await this.orderService.getOrder(id);
      if (
        typeof order.logistics_partner === 'undefined' ||
        !order.logistics_partner
      ) {
        return new UnauthorizedException(
          'This order hasnt been assigned to you',
        );
      }

      if (order.logistics_partner !== user.logistics_partner) {
        return new UnauthorizedException(
          'This order hasnt been assigned to you',
        );
      }

      return await this.orderRepository.update(id, { status: body.status });
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }

  async viewOrder(user: User, id: string) {
    try {
      const order = await this.orderRepository.findOneBy({
        id,
        logistics_partner: { id: user.logistics_partner.id },
      });

      if (!order) {
        return new NotFoundException(
          ` order with id ${id} does  not  exist or isnt asigned to you`,
        );
      }
      return order;
    } catch (err) {
      user;
      throw new HttpException(err.message, err.status);
    }
  }
}
