import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable, HttpException } from '@nestjs/common';
import { CreateOrderDto, UpdateOrderDto } from './dto/order.dto';
import { Order } from './entities/order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  public async createOrder(
    payload: CreateOrderDto,
  ): Promise<Order | undefined> {
    try {
      console.log(payload);
      return;
    } catch (err: any) {
      throw new HttpException(err.message, err.status);
    }
  }

  public async updateOrder(
    payload: UpdateOrderDto,
    orderId: string,
  ): Promise<Order | undefined> {
    try {
      console.log(payload, orderId);
      return;
    } catch (err: any) {
      throw new HttpException(err.message, err.status);
    }
  }

  public async deleteOrder(orderId: string): Promise<Order | undefined> {
    try {
      console.log(orderId);
      return;
    } catch (err: any) {
      throw new HttpException(err.message, err.status);
    }
  }

  public async getOrder(orderId: string): Promise<Order | undefined> {
    try {
      console.log(orderId);
      return;
    } catch (err: any) {
      throw new HttpException(err.message, err.status);
    }
  }

  public async getOrders(): Promise<Order | undefined> {
    try {
      return;
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
