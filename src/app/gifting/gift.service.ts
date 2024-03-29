import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere, Like } from 'typeorm';
import {
  Injectable,
  NotFoundException,
  forwardRef,
  Inject,
} from '@nestjs/common';
import { Gift } from './entities/gift.entity';
import { CreateGiftDto } from './dto/create-gift.dto';
import { MailService } from '../../mail/mail.service';
import { SuccessResponse } from 'src/utils/response';
import { User } from '../users/entities/user.entity';
import { PaystackBrokerService } from '../payment/paystack/paystack.service';
import { ProductService } from '../product/product.service';
import { Role } from 'src/types/general';
import { OrderService } from '../order/order.service';
import { TransactionService } from '../transaction/transaction.service';
import { CreateGiftOrderDto } from '../order/dto/order.dto';
import { Order } from '../order/entities/order.entity';
import { ConfigService } from '@nestjs/config';
import { Status } from 'src/types/order';

@Injectable()
export class GiftService {
  constructor(
    @InjectRepository(Gift)
    private readonly giftRepository: Repository<Gift>,
    private mailService: MailService,
    private orderService: OrderService,
    @Inject(forwardRef(() => TransactionService))
    private transactionService: TransactionService,
    private productService: ProductService,
    @Inject(forwardRef(() => PaystackBrokerService))
    private paystackService: PaystackBrokerService,
    private readonly configService: ConfigService,
  ) {}

  async fetchGiftsByCurrentUser(user: User): Promise<Gift[]> {
    return await this.giftRepository.find({
      where: {
        order: {
          user: { id: user.id },
        },
      },
      relations: ['order', 'products'],
      select: ['product', 'id', 'createdAt', 'giftCode'],
    });
  }
  async fetchGiftsForCurrentUser(user: User): Promise<Gift[]> {
    return await this.giftRepository.find({
      where: {
        recievers: Like(`%${user.email}%`),
      },
      relations: ['product'],
      select: ['product', 'id', 'createdAt', 'giftCode'],
    });
  }
  async fetchSingleGift(filter: FindOptionsWhere<Gift>): Promise<Gift> {
    let trimmedCode = filter.giftCode as string;
    trimmedCode = trimmedCode.trim();
    const gift = await this.giftRepository.findOne({
      where: {
        ...filter,
        giftCode: trimmedCode,
      },
      relations: ['product', 'order'],
      select: [
        'recievers',
        'note',
        'order',
        'product',
        'id',
        'createdAt',
        'giftCode',
      ],
    });
    if (!gift) {
      throw new NotFoundException(`Invalid gift code`);
    }
    return gift;
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
        select: ['recievers', 'id', 'createdAt', 'giftCode'],
      });
    }
  }
  async claimGift(
    giftCode: string,
    user: User,
    payload: CreateGiftOrderDto,
  ): Promise<SuccessResponse> {
    const trimmedCode = giftCode.trim();
    const gift = await this.giftRepository.findOne({
      where: {
        giftCode: trimmedCode,
        order: { status: Status.PAID },
        recievers: Like(`%${user.email}%`),
      },
      relations: ['product', 'order', 'order.transactions'],
      select: [
        'product',
        'quantity',
        'recievers',
        'giftCode',
        'id',
        'createdAt',
      ],
    });

    if (!gift) {
      throw new NotFoundException(`Invalid gift code`);
    }
    const orders: Order[] = [
      await this.orderService.createGiftOrder(user, gift, payload),
    ];
    console.log('passed here');
    await this.transactionService.createGiftTransaction(user, orders, gift);
    // make the provided gift code not apply to the user again after claiming the gift
    let giftBenefactors = [...gift.recievers];
    giftBenefactors = giftBenefactors.filter((benefactor) => {
      return benefactor !== user.email;
    });
    // when all gift has been claimed and no longer applies to anyone, delete gift
    if (!giftBenefactors[0]) {
      await this.giftRepository.delete({ giftCode });
    } else {
      gift.recievers = giftBenefactors;
      await this.giftRepository.save(gift);
    }
    // send gift claim confirmation message
    await this.mailService.sendGiftClaimConfirmationMessage(
      user,
      orders[0].id,
      `${gift.order.user.firstName} ${gift.order.user.lastName}`,
    );
    // send gift claim notification to gifter
    await this.mailService.sendGiftClaimNotificationToGifter({
      user: gift.order.user.email,
      name: gift.order.user.firstName,
      productName: gift.product.name,
      reciever: `${user.firstName} ${user.lastName}`,
    });
    return new SuccessResponse(gift, 'Gift claimed successfully.');
  }
  async createGift(
    data: CreateGiftDto,
    user: User,
  ): Promise<{
    authorization_url: string;
    access_code: string;
    reference: string;
  }> {
    const {
      quantity = null,
      recievers,
      product: productId,
      note = 'Suprise!!!',
    } = data;

    const product = await this.productService.handleGetAProduct(productId);

    const gift = this.giftRepository.create({
      product,
      recievers: recievers,
      quantity: quantity ? parseInt(quantity) : recievers.length,
      note: note,
    });
    await this.giftRepository.save(gift);
    const paymentLink = await this.paystackService.createPayRefForGift(
      user,
      gift,
    );
    return paymentLink;
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
