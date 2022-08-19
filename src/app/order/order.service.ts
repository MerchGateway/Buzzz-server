import { InjectRepository } from '@nestjs/typeorm';
import {  Repository } from 'typeorm';
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
  ): Promise<Order | undefined> {
    try {
      const cart = await this.cartService.getCartItems(user);

      console.log(payload);

      const newOrder = this.orderRepository.create({
        shipping_fee: payload.shipping_fee,
        status: payload.status,
        user,
        cart,
      });
      return this.orderRepository.save(newOrder);
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
    user: User,
  ): Promise<Order | undefined> {
    try {
      console.log(orderId);
      // check if category exists
      const isOrder = await this.orderRepository.findOne({
        where: { id: orderId },
        relations: { user: true },
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
    user: User,
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
        relations: { user: true },
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
