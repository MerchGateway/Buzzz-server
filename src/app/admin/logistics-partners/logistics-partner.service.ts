import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
      // load user  with  logistics  partner relationship
      const userWithLogisticsRelation = await this.userRepository.findOne({
        where: { id: user.id },
        relations: ['logistics_partner'],
      });

      // const partner = await this.logisticsPartnerRepository.findOneBy({
      //   id: userWithLogisticsRelation.logistics_partner.id,
      // });
      const orders = await this.orderRepository
        .createQueryBuilder('order')
        .leftJoin('order.logistics_partner', 'logistics_partner')
        .leftJoinAndSelect('order.product', 'product')
        .select('product.thumbnail')
        .addSelect('shipping_details')
        .addSelect('quantity')
        .addSelect('status')
        .where('logistics_partner.id=:logistics_partner', {
          logistics_partner: userWithLogisticsRelation.logistics_partner.id,
        })
        .getRawMany();
      return orders;
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }

  async updateStatus(user: User, body: { status: Status }, id: string) {
    try {
      // load user  with  logistics  partner relationship
      const userWithLogisticsRelation = await this.userRepository.findOne({
        where: { id: user.id },
        relations: ['logistics_partner'],
      });

      const allowedStatuses = ['Sent-For-Delievery', 'Delievered'];

      if (!allowedStatuses.includes(body.status)) {
        throw new UnauthorizedException(
          'Logistics partner  only allowed  to set status  to "Sent for delievery" or "Delievered" ',
        );
      }

      const order = await this.orderRepository.findOne({
        where: { id },
        relations: ['logistics_partner'],
      });

      if (
        !order.logistics_partner ||
        order.logistics_partner.id !==
          userWithLogisticsRelation.logistics_partner.id
      ) {
        throw new UnauthorizedException(
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
      const userWithPartner = await this.userRepository.findOne({
        where: { id: user.id },
        relations: { logistics_partner: true },
      });
      const order = await this.orderRepository.findOne({
        where: {
          id,
          logistics_partner: { id: userWithPartner.logistics_partner.id },
        },
        relations: { logistics_partner: true },
      });

      if (!order) {
        throw new NotFoundException(
          ` order with id ${id} does  not  exist or isnt asigned to you`,
        );
      }
      return {
        status: order.status,
        thumbnail: order.product.thumbnail,
        quantity: order.quantity,
        shipping_details: order.shipping_details,
      };
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }
}
