import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDeliveryCostDto } from './dto/create-delivery-cost.dto';
import { UpdateDeliveryCostDto } from './dto/update-delivery-cost.dto';
import { FindOptionsUtils, Repository } from 'typeorm';
import { DeliveryCost } from './entities/delivery-cost.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';
import { SuccessResponse } from 'src/utils/response';
import { NigerianStates } from 'src/types/States';

@Injectable()
export class DeliveryCostService {
	constructor(
		@InjectRepository(DeliveryCost)
		private readonly deliveryCostRepository: Repository<DeliveryCost>
	) {}

	async create(createDeliveryCostDto: CreateDeliveryCostDto) {
		const deliveryCost = this.deliveryCostRepository.create(
			createDeliveryCostDto
		);
		return await this.deliveryCostRepository.save(deliveryCost);
	}

	async findAll(options: IPaginationOptions) {
		const qb = this.deliveryCostRepository.createQueryBuilder('deliveryCost');
		FindOptionsUtils.joinEagerRelations(
			qb,
			qb.alias,
			this.deliveryCostRepository.metadata
		);
		qb.orderBy('deliveryCost.createdAt', 'DESC');

		return paginate<DeliveryCost>(qb, options);
	}

	async findOne(id: string) {
		const deliveryCost = await this.deliveryCostRepository.findOneBy({
			id,
		});

		if (!deliveryCost) {
			throw new NotFoundException(`Delivery Cost with id ${id} not found`);
		}

		return deliveryCost;
	}

	async findDeliveryCostByState(state: NigerianStates) {
		const deliveryCost = await this.deliveryCostRepository.findOneBy({
			state,
		});

		if (!deliveryCost) {
			throw new NotFoundException(`Delivery Cost for ${state} not found`);
		}

		return deliveryCost;
	}

	async update(id: string, updateDeliveryCostDto: UpdateDeliveryCostDto) {
		const deliveryCost = await this.findOne(id);

		await this.deliveryCostRepository.update(deliveryCost.id, {
			...updateDeliveryCostDto,
		});

		return await this.findOne(id);
	}

	async remove(id: string) {
		const deliveryCost = await this.findOne(id);

		await this.deliveryCostRepository.remove(deliveryCost);

		return new SuccessResponse(
			null,
			`Delivery Cost with id ${id} deleted successfully deleted`
		);
	}
}
