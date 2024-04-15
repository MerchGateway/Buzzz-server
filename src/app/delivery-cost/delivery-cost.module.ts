import { Module } from '@nestjs/common';
import { DeliveryCostService } from './delivery-cost.service';
import { DeliveryCostController } from './delivery-cost.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeliveryCost } from './entities/delivery-cost.entity';
import { CLOUDINARY } from 'src/constant';
import { ConfigService } from '@nestjs/config';
import { CloudinaryProvider } from 'src/providers/cloudinary.provider';

@Module({
	imports: [TypeOrmModule.forFeature([DeliveryCost])],
	controllers: [DeliveryCostController],
	providers: [
		DeliveryCostService,
		{
			provide: CLOUDINARY,
			useFactory: (configService: ConfigService) => {
				return new CloudinaryProvider(configService);
			},
			inject: [ConfigService],
		},
	],
	exports: [DeliveryCostService],
})
export class DeliveryCostModule {}
