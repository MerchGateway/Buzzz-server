import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ArrayContains } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Gift } from './entities/gift.entity';
import { CreateGiftDto } from './dto/create-gift.dto';
import { MailService } from '../../mail/mail.service';
import { SuccessResponse } from 'src/utils/response';
import { User } from '../users/entities/user.entity';
import { PaystackBrokerService } from '../payment/paystack/paystack.service';
import { ProductService } from '../product/product.service';
import { Role } from 'src/types/general';

@Injectable()
export class GiftService {
  constructor(
    @InjectRepository(Gift)
    private readonly giftRepository: Repository<Gift>,
    private mailService: MailService,
    private productService: ProductService,
    private paystackService: PaystackBrokerService,
  ) {}

  async fetchGiftsByCurrentUser(user: User): Promise<Gift[]> {
    return await this.giftRepository.find({
      where: {
        order: {
          user: { id: user.id },
        },
      },
      relations: ['order'],
      select: ['product', 'id', 'createdAt'],
    });
  }
  async fetchGiftsForCurrentUser(user: User): Promise<Gift[]> {
    return await this.giftRepository.find({
      where: {
        recievers: ArrayContains([user.email]),
      },
      relations: ['order'],
      select: ['product', 'id', 'createdAt'],
    });
  }
  async fetchSingleGift(giftCode: string): Promise<Gift> {
    return await this.giftRepository.findOne({
      where: {
        giftCode,
      },
      select: ['product', 'id', 'createdAt'],
    });
  }
  async fetchGiftBenefactors(giftCode: string, user: User): Promise<Gift[]> {
    const adminRoles = [Role.ADMIN, Role.SUPER_ADMIN];
    if (adminRoles.includes(user.role)) {
      return await this.giftRepository.find({
        where: {
          giftCode,
        },
        select: ['recievers', 'id', 'createdAt'],
      });
    } else {
      return await this.giftRepository.find({
        where: {
          giftCode,
          order: {
            user: { id: user.id },
          },
        },
        relations: ['order'],
        select: ['recievers', 'id', 'createdAt'],
      });
    }
  }
  async claimGift(giftCode: string, user: User): Promise<Gift> {
    const gift = await this.giftRepository.findOne({
      where: {
        giftCode,
        recievers: ArrayContains([user.email]),
      },
    });
    if (!gift) {
      throw new NotFoundException(
        `Gift associated with the  gift code '${giftCode}' does not exit`,
      );
    }
    return gift;
  }
  async createGift(
    data: CreateGiftDto,
    user: User,
  ): Promise<{
    authorization_url: string;
    access_code: string;
    reference: string;
  }> {
    const product = await this.productService.handleGetAProduct(data.product);
    const gift = this.giftRepository.create({
      product,
      recievers: data.recievers,
    });
    await this.giftRepository.save(gift);

    return await this.paystackService.createPayRefForGift(user, gift);
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
