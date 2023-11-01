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

@Processor(EVENT_QUEUE)
export class MessageConsumer {
  constructor(
    private readonly designService: DesignService,
    @InjectRepository(Design)
    private readonly designRepository: Repository<Design>,
    @Inject(CLOUDINARY)
    private readonly imageStorage: CloudinaryProvider,
  ) {}

  @Process(DESIGN_MERCH)
  async readOperationJob(job: Job<unknown>) {
    console.log('entered queue');
    const jobData: any = job.data;
    let isDesignExist: { design: Design };

    try {
      if (jobData.id) {
        isDesignExist = {
          design: await this.designService.fetchSingleDesign(jobData.id),
        };

        if (
          jobData.user &&
          isDesignExist.design &&
          !isDesignExist.design.contributors.includes(jobData.user.email)
        ) {
          console.log('unauthorized to design');
          throw new WsException('You are not an authorized contributor');
        }
      } else {
        isDesignExist = { design: null };
      }
      console.log(isDesignExist);
      if (!isDesignExist.design) {
        console.log('creating new design');
        const newDesign = this.designRepository.create({
          user: jobData.user,
          texts: [],
          images: [],
          contributors: [],
        });

        const updatedDesign = await this.designService.sortAssets(
          newDesign,
          jobData.payload,
        );
        console.log('came back here', updatedDesign);
        return updatedDesign;
      } else {
        if (isDesignExist.design.published === true) {
          throw new WsException('Design already published');
        }

        console.log('updating old design');
        isDesignExist.design.images = [];
        isDesignExist.design.texts = [];

        // delete old images from cloudinary
        await this.imageStorage.deletePhotosByPrefix(isDesignExist.design.id);
        const updatedDesign = await this.designService.sortAssets(
          isDesignExist.design,
          jobData.payload,
        );

        console.log(updatedDesign);
        return updatedDesign;
      }
    } catch (err) {
      throw new WsException(err.message);
    }
  }
}
