import { Module } from '@nestjs/common';
import { LogisticsPartner } from '../logistics-partners/entities/logistics-partner.entity';
import { LogisticsPartnerService } from './logistics-partner.service';
import { LogisticsPartnerController } from './logistics-partner.controller';
import { User } from 'src/app/users/entities/user.entity';
import { Order } from 'src/app/order/entities/order.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderModule } from 'src/app/order/order.module';

@Module({
  imports: [OrderModule,TypeOrmModule.forFeature([LogisticsPartner, User, Order])],
  controllers: [LogisticsPartnerController],
  providers: [LogisticsPartnerService],
  exports: [LogisticsPartnerService],
})
export class LogisticsPartnerModule {}
