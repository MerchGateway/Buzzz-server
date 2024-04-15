import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	UseGuards,
	DefaultValuePipe,
	ParseIntPipe,
	Query,
} from '@nestjs/common';
import { DeliveryCostService } from './delivery-cost.service';
import { CreateDeliveryCostDto } from './dto/create-delivery-cost.dto';
import { UpdateDeliveryCostDto } from './dto/update-delivery-cost.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/types/general';
import { RolesGuard } from '../auth/guards/roles.guard';
import { ConfigService } from '@nestjs/config';
import { NigerianStates } from 'src/types/States';

@Controller('delivery-cost')
export class DeliveryCostController {
	constructor(
		private readonly deliveryCostService: DeliveryCostService,
		private readonly configService: ConfigService
	) {}

	@Post()
	@Roles(Role.ADMIN, Role.SUPER_ADMIN)
	@UseGuards(RolesGuard)
	create(@Body() createDeliveryCostDto: CreateDeliveryCostDto) {
		return this.deliveryCostService.create(createDeliveryCostDto);
	}

	@Get()
	findAll(
		@Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
		@Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10
	) {
		limit = limit > 100 ? 100 : limit < 10 ? 10 : limit;

		return this.deliveryCostService.findAll({
			page,
			limit,
			route: `${this.configService.get<string>('appUrl')}/delivery-cost`,
		});
	}

	@Get('find-by-state')
	findByState(@Query('state') state: NigerianStates) {
		return this.deliveryCostService.findDeliveryCostByState(state);
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.deliveryCostService.findOne(id);
	}

	@Patch(':id')
	@Roles(Role.ADMIN, Role.SUPER_ADMIN)
	@UseGuards(RolesGuard)
	update(
		@Param('id') id: string,
		@Body() updateDeliveryCostDto: UpdateDeliveryCostDto
	) {
		return this.deliveryCostService.update(id, updateDeliveryCostDto);
	}

	@Roles(Role.ADMIN, Role.SUPER_ADMIN)
	@UseGuards(RolesGuard)
	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.deliveryCostService.remove(id);
	}
}
