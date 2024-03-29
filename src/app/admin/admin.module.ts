import { Module, forwardRef } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { PrintingPartnerModule } from './printing-partners/printing-partner.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogisticsPartnerModule } from './logistics-partners/logistics-partner.module';
import { RolesGuard } from '../auth/guards/roles.guard';
import { LogisticsPartner } from './logistics-partners/entities/logistics-partner.entity';
import { PrintingPartner } from './printing-partners/entities/printing-partner.entity';
import { User } from '../users/entities/user.entity';
import { APP_GUARD } from '@nestjs/core';
import { Order } from '../order/entities/order.entity';
import { MailService } from 'src/mail/mail.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([LogisticsPartner, User, PrintingPartner, Order]),

    forwardRef(() => PrintingPartnerModule),
    LogisticsPartnerModule,
  ],
  controllers: [AdminController],
  providers: [
    AdminService,
    MailService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  exports: [AdminService],
})
export class AdminModule {}
