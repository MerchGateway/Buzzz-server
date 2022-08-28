import {
  Body,
  Controller,
  Param,
  Post,
  Put,
  Get,
  Delete,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';

import { OrderService } from './order.service';
import { CreateOrderDto, UpdateOrderDto } from './dto/order.dto';
import { Order } from './entities/order.entity';
import { CurrentUser } from 'src/decorators/user.decorator';
import { User } from '../users/entities/user.entity';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  private createOrder(
    @Body() payload: CreateOrderDto,
    @CurrentUser() user: User,
  ): Promise<Order[] | undefined> {
    return this.orderService.createOrder(payload, user);
  }

  // @Put('/:orderId')
  // private updateOrder(
  //   @Body() payload: UpdateOrderDto,
  //   @Param('orderId', ParseUUIDPipe) orderId: string,
  // ): Promise<Order | undefined> {
  //   return this.orderService.updateOrder(payload, orderId);
  // }

  @Put('/:orderId/complete')
  private completeOrder(
    @Param('orderId', ParseUUIDPipe) orderId: string,
  ): Promise<Order | undefined> {
    return this.orderService.completeOrder(orderId);
  }
  @Delete('/:orderId')
  private deleteOrder(
    @Param('orderId', ParseUUIDPipe) orderId: string,
    @CurrentUser() user: User,
  ): Promise<Order | undefined> {
    return this.orderService.deleteOrder(orderId, user);
  }

  @Get('/:orderId')
  private getOrder(
    @Param('orderId', ParseUUIDPipe) orderId: string,
    @CurrentUser() user: User,
  ): Promise<Order | undefined> {
    return this.orderService.getOrder(orderId, user);
  }
  @Get('')
  private getOrders(@CurrentUser() user: User): Promise<Order[] | undefined> {
    return this.orderService.getOrders(user);
  }
}
