import { Module } from '@nestjs/common';
import { DesignService } from './design.service';
import { Design } from './entities/design.entity';
import { CartModule } from '../cart/cart.module';
import { ProductModule } from '../product/product.module';
import { PaystackBrokerModule } from '../payment/paystack/paystack.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DesignController } from './design.controller';
import { ConfigService } from '@nestjs/config';
import { AppGateway } from 'src/app.gateway';
import {APP_GATEWAY } from 'src/constant';
import { Jwt } from 'src/providers/jwt.provider';
import { JWT } from 'src/constant';
import { JwtModule } from '@nestjs/jwt';
import configuration from 'src/config/configuration';
import { UsersModule } from '../users/users.module';
import { PolyMailerContent } from '../order/entities/polymailer_content.entity';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forFeature([Design, PolyMailerContent]),
    JwtModule.register({
      secret: configuration().jwt.secret,
      signOptions: { expiresIn: configuration().jwt.expiresIn },
    }),
    PaystackBrokerModule,
    ProductModule,
    CartModule,
  ],
  providers: [
    DesignService,

    {
      provide: APP_GATEWAY,
      useClass: AppGateway,
    },
   
    {
      provide: JWT,
      useClass: Jwt,
    },
  ],
  controllers: [DesignController],
  exports: [DesignService],
})
export class DesignModule {}
