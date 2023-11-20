import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Waitlist } from './entities/waitlist.entity';
import { CreateWaitlistDto } from './dto/create-waitlist.dto';
import { MailService } from '../../mail/mail.service';
import { SuccessResponse } from 'src/utils/response';
// import { SuccessResponse } from 'src/utils/response';

@Injectable()
export class WaitlistService {
  constructor(
    @InjectRepository(Waitlist)
    private readonly waitlistRepository: Repository<Waitlist>,
    private mailService: MailService,
  ) {}

  async fetchwaitlist(): Promise<Waitlist[]> {
    return await this.waitlistRepository.find();
  }
  async createwaitlist(waitlist: CreateWaitlistDto): Promise<SuccessResponse> {
    console.log(waitlist);
    const isAlreadyAdded = await this.waitlistRepository.findOneBy({
      client: waitlist.client,
    });
    if (isAlreadyAdded) {
      return new SuccessResponse(
        isAlreadyAdded,
        'You have been successfully added to our waitlist',
      );
    }
    const newWaitlist = this.waitlistRepository.create(waitlist);
    await this.waitlistRepository.save(newWaitlist);
    await this.mailService.sendWaitlistConfirmationMessage(waitlist.client);
    return new SuccessResponse(
      isAlreadyAdded,
      'You have been successfully added to our waitlist',
    );
  }
  // async sendNewProductUpdatesToWaitlist(): Promise<SuccessResponse> {
  //   const newWaitlist = await this.waitlistRepository.find({
  //     select: ['client'],
  //   });

  //   await this.mailService.sendNewProductUpdate(newWaitlist as any);
  //   return new SuccessResponse(
  //     newWaitlist,
  //     'Waitlist successfully updated with new product update(s)',
  //   );
  // }
}
