import { DESIGN_MERCH, EVENT_QUEUE, CLOUDINARY } from './constant';
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { DesignService } from './app/design/design.service';
import { WsException } from '@nestjs/websockets/errors';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Design } from './app/design/entities/design.entity';
import { CloudinaryProvider } from './providers/cloudinary.provider';
import { Inject } from '@nestjs/common';
import { BullJobPayload } from './types/websocket';

@Processor(EVENT_QUEUE)
export class MessageConsumer {
	constructor(
		private readonly designService: DesignService,
		@InjectRepository(Design)
		private readonly designRepository: Repository<Design>,
		@Inject(CLOUDINARY)
		private readonly imageStorage: CloudinaryProvider
	) {}

	@Process(DESIGN_MERCH)
	async readOperationJob(job: Job<BullJobPayload>) {
		const jobData = job.data;
		let isDesignExist: { design: Design };

		try {
			if (jobData.id) {
				isDesignExist = {
					design: await this.designService.fetchSingleDesign(jobData.id),
				};

				if (
					jobData.user &&
					isDesignExist.design &&
					isDesignExist.design.contributors[0] &&
					!isDesignExist.design.contributors.includes(jobData.user.email)
				) {
					throw new WsException('You are not an authorized contributor');
				} else if (
					jobData.user &&
					isDesignExist.design &&
					!isDesignExist.design.contributors[0]
				) {
					const design = await this.designService.attachDesignToUser(
						jobData.user,
						isDesignExist.design.id
					);
					isDesignExist.design = design;
				} else if (
					!jobData.user &&
					isDesignExist.design &&
					isDesignExist.design.user
				) {
					throw new WsException('You are not an authorized contributor');
				}
			} else {
				isDesignExist = { design: null };
			}
			if (!isDesignExist.design) {
				const newDesign = this.designRepository.create({
					user: jobData.user,
					texts: [],
					images: [],
					contributors: [],
				});

				let updatedDesign = await this.designService.sortAssets(
					newDesign,
					jobData.payload
				);

				return updatedDesign;
			} else {
				if (isDesignExist.design.published === true) {
					throw new WsException('Design already published');
				}

				isDesignExist.design.images = [];
				isDesignExist.design.texts = [];

				// delete old images from cloudinary
				await this.imageStorage.deletePhotosByPrefix(isDesignExist.design.id);

				let updatedDesign = await this.designService.sortAssets(
					isDesignExist.design,
					jobData.payload
				);

				await this.designService.deleteDesignVariantByDesignId(
					isDesignExist.design.id
				);

				return updatedDesign;
			}
		} catch (err) {
			throw new WsException(err.message);
		}
	}
}
