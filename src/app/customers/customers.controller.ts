import { Controller, Get, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { CurrentUser } from 'src/decorators/user.decorator';
import { User } from '../users/entities/user.entity';
import { CustomersService } from './customers.service';

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
    return this.customersService.create(sellerId, user.id);
  }

  // gets all the customers for the current user,
  @Get()
  findAll(@CurrentUser() user: User) {
    return this.customersService.findAll(user.id);
  }
//TODO: search or filter by sex, country(should be done on the frontend though)
}
