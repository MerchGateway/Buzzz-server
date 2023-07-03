import { Module } from '@nestjs/common';
import { MessageConsumer } from 'src/message.consumer';
import { DesignService } from './design.service';
import { Design } from './entities/design.entity';
import { CartModule } from '../cart/cart.module';
import { ProductModule } from '../product/product.module';
import { PaystackBrokerModule } from '../payment/paystack/paystack.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DesignController } from './design.controller';
import { ConfigService } from '@nestjs/config';
import { AppGateway } from 'src/app.gateway';
import { APP_GATEWAY, EVENT_QUEUE } from 'src/constant';
import { Jwt } from 'src/providers/jwt.provider';
import { JWT } from 'src/constant';
import { CLOUDINARY } from 'src/constant';
import { CloudinaryProvider } from 'src/providers/cloudinary.provider';
import { JwtModule } from '@nestjs/jwt';
import configuration from 'src/config/configuration';
import { UsersModule } from '../users/users.module';
import { PolyMailerContent } from '../order/entities/polymailer_content.entity';
import { BullModule } from '@nestjs/bull';
@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: configuration().database.host,
        port: configuration().redis.port
      },
    }),
    BullModule.registerQueue({
      name: EVENT_QUEUE,
    }),
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
    MessageConsumer,
    {
      provide: CLOUDINARY,
      useFactory: (configService: ConfigService) => {
        return new CloudinaryProvider(configService);
      },
      inject: [ConfigService],
    },

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
