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
import { Role } from 'src/types/general';

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
    // load user  with  logistics  partner relationship
    const userWithLogisticsRelationship = await this.userRepository.findOne({
      where: { id: user.id },
      relations: ['logistics_partner'],
    });

    // const partner = await this.logisticsPartnerRepository.findOneBy({
    //   id: userWithLogisticsRelation.logistics_partner.id,
    // });
    const orders = await this.orderRepository
      .createQueryBuilder('order')
      .leftJoin('order.logistics_partner', 'logistics_partner')
      .leftJoin('order.product', 'product')
      .select('product.thumbnail')
      .addSelect('shipping_details')
      .addSelect('quantity')
      .addSelect('status')
      .where('logistics_partner.id=:logistics_partner', {
        logistics_partner: userWithLogisticsRelationship.logisticsPartner.id,
      })
      .getRawMany();
    return orders;
  }

  async updateStatus(user: User, body: { status: Status }, id: string) {
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
      !order.logisticsPartner ||
      order.logisticsPartner.id !==
        userWithLogisticsRelation.logisticsPartner.id
    ) {
      throw new UnauthorizedException(
        'This order has not been assigned to you',
      );
    }

    return await this.orderRepository.update(id, { status: body.status });
  }

  async viewOrder(user: User, id: string) {
    let order: Order;
    if (user.role === Role.SUPER_ADMIN) {
      order = await this.orderRepository.findOne({
        where: {
          id,
        },
        select: ['id', 'quantity', 'product', 'status', 'shippingDetails'],
      });
    } else {
      const userWithPartner = await this.userRepository.findOne({
        where: { id: user.id },
        relations: { logisticsPartner: true },
      });
      order = await this.orderRepository.findOne({
        where: {
          id,
          logisticsPartner: { id: userWithPartner.logisticsPartner.id },
        },
        relations: { logisticsPartner: true },
        select: ['id', 'quantity', 'product', 'status', 'shippingDetails'],
      });
    }

    if (!order) {
      throw new NotFoundException(
        `order with id ${id} does  not  exist or is not assigned to you`,
      );
    }
    return order
  }
}
