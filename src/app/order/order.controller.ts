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
  Query,
  UseGuards,
} from '@nestjs/common';
import { ParseIntPipe } from '@nestjs/common';
import { DefaultValuePipe } from '@nestjs/common';
import { Pagination } from 'nestjs-typeorm-paginate';
import { OrderService } from './order.service';
import { CreateOrderDto, UpdateOrderDto } from './dto/order.dto';
import { Order } from './entities/order.entity';
import { CurrentUser } from 'src/decorators/user.decorator';
import { User } from '../users/entities/user.entity';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/types/general';
import { RolesGuard } from '../auth/guards/roles.guard';
import { ConfigService } from '@nestjs/config';
import { Status } from 'src/types/order';

@Controller('orders')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly configService: ConfigService,
  ) {}

  @Post('')
  @HttpCode(HttpStatus.CREATED)
  private createOrder(
    @Body() payload: CreateOrderDto,
    @CurrentUser() user: User,
  ): Promise<Order[] | undefined> {
    return this.orderService.createOrder(user, payload);
  }

  @Roles(Role.SUPER_ADMIN)
  @UseGuards(RolesGuard)
  @Put('/:orderId/update-status')
  private updateOrderStatus(
    @Param('orderId', ParseUUIDPipe) orderId: string,
    @Body() payload: UpdateOrderDto,
  ): Promise<Order | undefined> {
    return this.orderService.updateOrderStatus(orderId, payload);
  }

  @Roles(Role.SUPER_ADMIN)
  @UseGuards(RolesGuard)
  @Delete('/:orderId')
  private deleteOrder(
    @Param('orderId', ParseUUIDPipe) orderId: string,
  ): Promise<Order | undefined> {
    return this.orderService.deleteOrder(orderId);
  }

  @Roles(Role.SUPER_ADMIN)
  @UseGuards(RolesGuard)
  @Get('/all')
  private getAllOrders(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 25,
    @Query('status') status: Status,
  ): Promise<Pagination<Order>> {
    limit = limit > 100 ? 100 : limit < 10 ? 10 : limit;
    return this.orderService.getAllOrders({
      page,
      limit,
      route: `${this.configService.get<string>('appUrl')}/order/all`,
      status,
    });
  }
  @Get('/:orderId')
  private getOrder(
    @Param('orderId', ParseUUIDPipe) orderId: string,
  ): Promise<Order | undefined> {
    return this.orderService.getOrder(orderId);
  }

  @Get('')
  private getOrders(
    @CurrentUser() user: User,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
  ): Promise<Pagination<Order> | Order[]> {
    limit = limit > 100 ? 100 : limit < 10 ? 10 : limit;
    return this.orderService.getOrders(user, {
      page,
      limit,
      route: `${this.configService.get<string>('appUrl')}/order/`,
    });
  }

  @Roles(Role.SUPER_ADMIN)
  @UseGuards(RolesGuard)
  @Get('/:userId/active')
  private getActiveOrders(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
    @Param('userId', ParseUUIDPipe) id: string,
  ): Promise<Pagination<Order>> {
    limit = limit > 100 ? 100 : limit < 10 ? 10 : limit;
    return this.orderService.getActiveOrders(id, {
      page,
      limit,
      route: `${this.configService.get<string>('appUrl')}/:userId/active`,
    });
  }
}
