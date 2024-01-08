import { Module } from '@nestjs/common';
import { PrintingPartner } from './entities/printing-partner.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrintingPartnerController } from './printing-partner.controller';
import { PrintingPartnerService } from './printing-partner.service';
import { User } from 'src/app/users/entities/user.entity';
import { Order } from 'src/app/order/entities/order.entity';
import { OrderModule } from 'src/app/order/order.module';
import { forwardRef } from '@nestjs/common';
import { AdminModule } from '../admin.module';
@Module({
  imports: [
    OrderModule,
    forwardRef(() => AdminModule),
    TypeOrmModule.forFeature([PrintingPartner, User, Order]),
  ],
  controllers: [PrintingPartnerController],
  providers: [PrintingPartnerService],
  exports: [PrintingPartnerService],
})
export class PrintingPartnerModule {}
