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
  UseGuards,
} from '@nestjs/common';

import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/order.dto';
import { Order } from './entities/order.entity';
import { CurrentUser } from 'src/decorators/user.decorator';
import { User } from '../users/entities/user.entity';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/types/general';
import { RolesGuard } from '../auth/guards/roles.guard';
import { PolyMailerContent } from './entities/polymailer_content.entity';

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

  @Roles(Role.SUPER_ADMIN)
  @UseGuards(RolesGuard)
  @Put('/:orderId/complete')
  private completeOrder(
    @Param('orderId', ParseUUIDPipe) orderId: string,
  ): Promise<Order | undefined> {
    return this.orderService.completeOrder(orderId);
  }
  


  @Roles(Role.SUPER_ADMIN)
  @UseGuards(RolesGuard)
  @Delete('/:orderId')
  private deleteOrder(
    @Param('orderId', ParseUUIDPipe) orderId: string,
    @CurrentUser() user: User,
  ): Promise<Order | undefined> {
    return this.orderService.deleteOrder(orderId);
  }

  @Roles(Role.SUPER_ADMIN)
  @UseGuards(RolesGuard)
  @Get('/all')
  private getAllOrders(): Promise<Order[] | undefined> {
    return this.orderService.getAllOrders();
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

  @Roles(Role.SUPER_ADMIN)
  @UseGuards(RolesGuard)
  @Get('/:userId/active')
  private getActiveOrders(
    @Param('userId', ParseUUIDPipe) id: string,
  ): Promise<Order[] | undefined> {
    return this.orderService.getActiveOrders(id);
  }
}
