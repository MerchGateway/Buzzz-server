import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { UsersModule } from '../users/users.module';
import { Customer } from './entities/customer.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderModule } from '../order/order.module';

@Module({
  imports: [TypeOrmModule.forFeature([Customer]), UsersModule, OrderModule],
  controllers: [CustomersController],
  providers: [CustomersService, UsersModule, OrderModule],
  exports: [CustomersService],
})
export class CustomersModule {}
