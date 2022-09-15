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
import { CreateOrderDto } from './dto/order.dto';
import { Order } from './entities/order.entity';
import { CurrentUser } from 'src/decorators/user.decorator';
import { User } from '../users/entities/user.entity';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/types/general';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('')
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

  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  @Put('/:orderId/complete')
  private completeOrder(
    @Param('orderId', ParseUUIDPipe) orderId: string,
  ): Promise<Order | undefined> {
    return this.orderService.completeOrder(orderId);
  }

  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  @Delete('/:orderId')
  private deleteOrder(
    @Param('orderId', ParseUUIDPipe) orderId: string,
    @CurrentUser() user: User,
  ): Promise<Order | undefined> {
    return this.orderService.deleteOrder(orderId);
  }

  @Get('/:orderId')
  private getOrder(
    @Param('orderId', ParseUUIDPipe) orderId: string,
    @CurrentUser() user: User,
  ): Promise<Order | undefined> {
    return this.orderService.getOrder(orderId);
  }
  @Get('')
  private getOrders(@CurrentUser() user: User): Promise<Order[] | undefined> {
    return this.orderService.getOrders(user);
  }
}
