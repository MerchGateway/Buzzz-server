import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pagination, IPaginationOptions } from 'nestjs-typeorm-paginate';
import { paginate } from 'nestjs-typeorm-paginate';
import {
  Injectable,
  HttpException,
  Inject,
  forwardRef,
  BadRequestException,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/order.dto';
import { NotFoundException } from '@nestjs/common';

import { Order } from './entities/order.entity';
import { User } from '../users/entities/user.entity';
import { CartService } from '../cart/cart.service';
import { Status } from 'src/types/order';
import { PolyMailerContent } from './entities/polymailer_content.entity';

interface OrderAnalyticsT {
  thisMonthOrder: number;
  lastTwoMonthsOrder: number;
}

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @Inject(forwardRef(() => CartService))
    private readonly cartService: CartService,
  ) {}

  public async createOrder(
    payload: CreateOrderDto,
    user: User,
  ): Promise<Order[] | undefined> {
    try {
      const userCartItems = await this.cartService.getCartItems(user);

      // throw exception if there isnt any item in cart
      if (!userCartItems[0]) {
        throw new BadRequestException(
          'Item{s} to create order for doesnt exist ',
        );
      }

      const result: Order[] = await Promise.all(
        userCartItems.map(async (cart) => {
          const order = new Order();
          order.user = user;
          order.cart = cart;
          order.sellerId = cart.product.sellerId;

          if (payload.shipping_address !== null) {
            order.shipping_details = {
              shipping_fee: 0,
              shipping_address: payload.shipping_address,
            };
          }

          // // save cart items

          return await this.orderRepository.save(order);
          // return await connection.manager.save(order);
        }),
      );

      return result;
    } catch (err: any) {
      throw new HttpException(err.message, err.status);
    }
  }

  public async deleteOrder(orderId: string): Promise<Order | undefined> {
    try {
      // check if order exists
      const isOrder = await this.orderRepository.findOne({
        where: { id: orderId },
      });

      if (!isOrder) {
        throw new NotFoundException(`Order with id ${orderId} does not exist`);
      }
      await this.orderRepository.delete(orderId);

      return isOrder;
    } catch (err: any) {
      throw new HttpException(err.message, err.status);
    }
  }

  public async getOrder(orderId: string): Promise<Order | undefined> {
    try {
      const order = await this.orderRepository.findOne({
        where: { id: orderId },
        relations: { user: true },
      });

      if (!order) {
        throw new NotFoundException(
          `Order with id ${orderId}  does not exist or deleted`,
        );
      }
      return order;
    } catch (err: any) {
      throw new HttpException(err.message, err.status);
    }
  }

  public async getAllOrders({
    limit,
    page,
    route,
  }: IPaginationOptions): Promise<Pagination<Order>> {
    try {
      // const Orders = await this.orderRepository.find();
      // return Orders;
      const orders = this.orderRepository.createQueryBuilder('order');
      return paginate<Order>(orders, { limit, page, route });
    } catch (err: any) {
      throw new HttpException(err.message, err.status);
    }
  }

  public async getOrders(
    user: User,
    pagination?: IPaginationOptions,
  ): Promise<Pagination<Order> | Order[]> {
    const { limit, page, route } = pagination;
    try {
      if (!pagination) {
        const Orders = await this.orderRepository.find({
          where: {
            user: { id: user.id },
          },
        });
        return Orders;
      }

      const orders = this.orderRepository
        .createQueryBuilder('order')
        .leftJoin('order.user', 'user')
        .where('user.id=:user', { user: user.id });

      return paginate<Order>(orders, { limit, page, route });
    } catch (err: any) {
      throw new HttpException(err.message, err.status);
    }
  }

  public async getActiveOrders(
    id: string,
    { limit, page, route }: IPaginationOptions,
  ): Promise<Pagination<Order>> {
    try {
      // const Orders = await this.orderRepository.find({
      //   where: {
      //     user: { id },
      //     status: Status.PAID,
      //   },
      // });
      // return Orders;
      const orders = this.orderRepository
        .createQueryBuilder('order')
        .leftJoin('order.user', 'user')
        .where('user.id=:user', { user: id })
        .andWhere('order.status=:status', { status: Status.PAID });

      return paginate<Order>(orders, { limit, page, route });
    } catch (err: any) {
      throw new HttpException(err.message, err.status);
    }
  }

  public async completeOrder(orderId: string): Promise<Order | undefined> {
    try {
      // console.log(orderId);
      // complete order logic eg when a users order is delievered
      await (await this.getOrder(orderId)).updateStatus(Status.COMPLETED);
      return;
    } catch (err: any) {
      throw new HttpException(err.message, err.status);
    }
  }

  //  SELLERS ANALYTICS

  // TODO: get revenue analytic for past two months just like orders
  public async revenueAnalytics(sellerId: string) {
    try {
      const data = await this.orderRepository
        .createQueryBuilder('order__')
        .where('order__.sellerId = :sellerId', { sellerId })
        .andWhere('order__.status = :status', { status: Status.PAID })
        .select('SUM(order__.total)', 'revenue')
        .getRawMany();

      return data;
    } catch (err: any) {
      throw new HttpException(err.message, err.status);
    }
  }

  public async orderAnalytics(userId: string): Promise<OrderAnalyticsT> {
    try {
      const date = new Date();
      const day = date.getDate();
      const month: number = date.getMonth();
      const year = date.getFullYear();

      // month is indexed at 0
      const presentMonth = year + '-' + (month + 1) + '-' + day;
      const lastMonth = year + '-' + month + '-' + day;
      const twoMonths = year + '-' + (month - 1) + '-' + day;

      //Query the number of all orders with status paid
      const thisMonthOrder = await this.orderRepository
        .createQueryBuilder('orders')
        .where('orders.sellerId = :sellerId', { sellerId: userId })
        .andWhere('orders.status = :status', { status: Status.PAID })
        //get the total orders within the last month,
        .andWhere(`orders.created_at BETWEEN ${lastMonth} AND ${presentMonth}`)
        .getCount();

      const lastTwoMonthsOrder = await this.orderRepository
        .createQueryBuilder('orders_')
        .where('orders_.sellerId = :sellerId', { sellerId: userId })
        .andWhere('orders_.status = :status', { status: Status.PAID })
        // get the total orders within the last two months
        .andWhere(`orders_.created_at BETWEEN ${twoMonths} AND ${lastMonth}`)
        .getCount();

      // compare the numbers, and show the percentage increase or decrease
      return {
        thisMonthOrder,
        lastTwoMonthsOrder,
      };
    } catch (err: any) {
      throw new HttpException(err.message, err.status);
    }
  }
}
