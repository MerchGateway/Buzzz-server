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
import { APP_GATEWAY, CLOUDINARY, JWT, EVENT_QUEUE } from 'src/constant';
import { Jwt } from 'src/providers/jwt.provider';
import { CloudinaryProvider } from 'src/providers/cloudinary.provider';
import { JwtModule } from '@nestjs/jwt';
import configuration from 'src/config/configuration';
import { UsersModule } from '../users/users.module';
import { PolymailerContent } from '../order/entities/polymailer-content.entity';
import { BullModule } from '@nestjs/bull';
import { getRedisConfiguration } from 'src/config/redis-configuration';
import { FeeModule } from '../fee/fee.module';
import { GiftModule } from '../gifting/gift.module';
import { DesignVariant } from './entities/design-variant.entity';

@Module({
	imports: [
		BullModule.forRoot({
			redis: getRedisConfiguration(configuration()),
		}),
		BullModule.registerQueue({
			name: EVENT_QUEUE,
		}),
		UsersModule,
		TypeOrmModule.forFeature([Design, DesignVariant, PolymailerContent]),
		JwtModule.register({
			secret: configuration().jwt.secret,
			signOptions: { expiresIn: configuration().jwt.expiresIn },
		}),
		GiftModule,
		PaystackBrokerModule,
		ProductModule,
		CartModule,
		FeeModule,
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
