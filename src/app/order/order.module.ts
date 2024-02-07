import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { Order } from './entities/order.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartModule } from '../cart/cart.module';
import { Gift } from '../gifting/entities/gift.entity';
import { GOOGLE_GEOCODER } from 'src/constant';
import { ConfigService } from '@nestjs/config';
import { GeocoderProvider } from 'src/providers/googleGeocoder.provider';
import { MailModule } from '../../mail/mail.module';
@Module({
  imports: [TypeOrmModule.forFeature([Order, Gift]), CartModule, MailModule],
  controllers: [OrderController],
  providers: [
    OrderService,
    {
      provide: GOOGLE_GEOCODER,
      useFactory: (configService: ConfigService) => {
        return new GeocoderProvider(configService);
      },
      inject: [ConfigService],
    },
  ],
  exports: [OrderService],
})
export class OrderModule {}
