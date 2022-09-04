import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
      console.log(payload);
      const userCartItems = await this.cartService.getCartItems(user);

      // throw exception if there isnt any item in cart
      if (!userCartItems[0]) {
        throw new BadRequestException(
          'Item{s} to create order for doesnt exist ',
        );
      }

      const result: Order[] = await Promise.all(
        userCartItems.map(async (cart) => {
          const newOrder = this.orderRepository.create({
            user,
            cart,
            shipping_details: {
              shipping_address: payload.shipping_address,
            },
          });
          // save cart items
          await this.orderRepository.save(newOrder);

          // fetch fresh copy of order
          return await this.getOrder(newOrder.id);
        }),
      );

      return result;
    } catch (err: any) {
      throw new HttpException(err.message, err.status);
    }
  }

  // public async updateOrder(
  //   payload: UpdateOrderDto,
  //   orderId: string,
  // ): Promise<Order | undefined> {
  //   try {
  //     console.log(payload, orderId);

  //     return;
  //   } catch (err: any) {
  //     throw new HttpException(err.message, err.status);
  //   }
  // }

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
      const order = await this.orderRepository.findOneBy({ id: orderId });

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

  public async getOrders(user: User): Promise<Order[] | undefined> {
    try {
      const Orders = await this.orderRepository.findBy({
        user: { id: user.id },
      });
      return Orders;
    } catch (err: any) {
      throw new HttpException(err.message, err.status);
    }
  }

  public async completeOrder(orderId: string): Promise<Order | undefined> {
    try {
      console.log(orderId);
      // complete order logic eg when a users order is delievered
      return;
    } catch (err: any) {
      throw new HttpException(err.message, err.status);
    }
  }
}
