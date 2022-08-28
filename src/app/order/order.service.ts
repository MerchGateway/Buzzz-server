import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable, HttpException } from '@nestjs/common';
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

    private readonly cartService: CartService,
  ) {}

  public async createOrder(
    payload: CreateOrderDto,
    user: User,
  ): Promise<Order[] | undefined> {
    try {
      console.log(payload);
      const userCartItems = await this.cartService.getCartItems(user);

      var newRecords: Order[] = [];

      const createOrder = () => {
        // loop through the cart items and create individual order records
        userCartItems.forEach((cart) => {
          const newOrder = this.orderRepository.create({
            shipping_details: payload.shipping_details,
            user,
            cart,
          });
          // save cart items
          this.orderRepository.save(newOrder);
          newRecords.push(newOrder);
        });
        return newRecords;
      };

      return createOrder();
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

  public async deleteOrder(
    orderId: string,
  ): Promise<Order | undefined> {
    try {
      console.log(orderId);
      // check if order exists
      const isOrder = await this.orderRepository.findOne({
        where: { id: orderId },
        relations:{cart:true}
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

  public async getOrder(
    orderId: string,
  ): Promise<Order | undefined> {
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

  public async getOrders(user: User): Promise<Order[] | undefined> {
    try {
      const Orders = await this.orderRepository.find({
        where: { user: { id: user.id } }
      });
      return Orders;
    } catch (err: any) {
      throw new HttpException(err.message, err.status);
    }
  }

  public async completeOrder(orderId: string): Promise<Order | undefined> {
    try {
      console.log(orderId);
      return;
    } catch (err: any) {
      throw new HttpException(err.message, err.status);
    }
  }
}
