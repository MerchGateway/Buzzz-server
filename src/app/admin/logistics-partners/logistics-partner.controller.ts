import {
  Controller,
  Post,
  Body,
  UseGuards,
  HttpCode,
  Get,
  Patch,
  Param,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Role } from 'src/types/general';
import { Roles } from 'src/decorators/roles.decorator';
import { LogisticsPartnerService } from './logistics-partner.service';
import { AdminService } from '../admin.service';
import { CurrentUser } from 'src/decorators/user.decorator';
import { User } from 'src/app/users/entities/user.entity';
import { Status } from 'src/types/order';

@Controller('admin/logistics-partner')
export class LogisticsPartnerController {
  constructor(private readonly logisticsService: LogisticsPartnerService) {}

  @Roles(Role.LOGISTIC_ADMIN)
  @Get('/get-orders')
  getOrders(@CurrentUser() user: User) {
    return this.logisticsService.getOrders(user);
  }

  @Roles(Role.LOGISTIC_ADMIN)
  @Patch('/update-status/:id')
  updateStatus(
    @Body() body: { status: Status },
    @CurrentUser() user: User,
    @Param('id') id: string,
  ) {
    return this.logisticsService.updateStatus(user, body, id);
  }

  @Roles(Role.LOGISTIC_ADMIN)
  @Get('/view-order/:id')
  viewOrder(@CurrentUser() user: User, @Param('id') id: string) {
    return this.logisticsService.viewOrder(user, id);
  }
}
