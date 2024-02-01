import {
  Body,
  Patch,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Delete,
  Post,
} from '@nestjs/common';
import { CurrentUser } from 'src/decorators/user.decorator';
import { User } from '../users/entities/user.entity';
import { CustomersService } from './customers.service';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/types/general';
import { RolesGuard } from '../auth/guards/roles.guard';
import { UseGuards } from '@nestjs/common';
import { Status } from 'src/types/status';
// import { CustomerParams } from '../../../dist/app/customers/customers.service';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  // receives the customers Id(current user id) and also the product owners id
  // finds if the current user has been linked to the product owner,
  // if not, create a relationship
  @Post(':sellerId')
  create(
    @Param('sellerId', ParseUUIDPipe) sellerId: string,
    @CurrentUser() user: User,
  ) {
    return this.customersService.create(sellerId, user);
  }

  // gets all the customers
  @Roles(Role.SUPER_ADMIN)
  @UseGuards(RolesGuard)
  @Get('all')
  findAllCustomersAvailable() {
    return this.customersService.findAllCustomersAvailable();
  }

  // gets all the customers for the current user,
  @Get()
  findAll(@CurrentUser() user: User) {
    return this.customersService.findAll(user.id);
  }

  @Roles(Role.SUPER_ADMIN)
  @UseGuards(RolesGuard)
  @Patch('/toggle-status/:sellerId')
  private toggleStatus(
    @Body('customer-status') Status: Status,
    @Param('sellerId', ParseUUIDPipe) sellerId: string,
  ) {
    return this.customersService.toggleStatus(Status, sellerId);
  }

  @Roles(Role.SUPER_ADMIN)
  @UseGuards(RolesGuard)
  @Delete('/:sellerId')
  private deleteCustomer(@Param('sellerId', ParseUUIDPipe) sellerId: string) {
    return this.customersService.deleteCustomer(sellerId);
  }
  //TODO: search or filter by sex, country(should be done on the frontend though)
}
