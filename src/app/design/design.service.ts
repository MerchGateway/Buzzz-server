import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Design } from './entities/design.entity';
import {
  PublishDesignDto,
  PublishDesignAndCheckoutDto,
} from './dto/design.dto';
import { CartService } from '../cart/cart.service';
import { ProductService } from '../product/product.service';
import { PaystackBrokerService } from '../payment/paystack/paystack.service';
import { User } from '../users/entities/user.entity';
import { SuccessResponse } from 'src/utils/response';
import { Product } from '../product/product.entity';
import { PolyMailerContent } from '../order/entities/polymailer_content.entity';
@Injectable()
export class DesignService {
  constructor(
    @InjectRepository(Design)
    private readonly designRepository: Repository<Design>,
    private readonly cartService: CartService,
    private readonly productService: ProductService,
    private readonly paystackBrokerService: PaystackBrokerService,
    @InjectRepository(PolyMailerContent)
    private readonly polyMailerContentRepository: Repository<PolyMailerContent>,
  ) {}
  async viewAllDesigns(): Promise<Design[] | undefined> {
    try {
      return await this.designRepository.find();
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }
  async fetchLatestDesignForCurrentUser(
    user: User,
  ): Promise<Design | undefined> {
    try {
      const design = await this.designRepository.find({
        where: { owner: { id: user.id }, published: false },
        order: {
          created_at: 'DESC',
        },
      })[0];

      if (!design) {
        throw new NotFoundException('Current user has not  made any design');
      }
      return design;
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }
  async fetchSingleDesign(id: string) {
    try {
      return await this.designRepository.findOne({ where: { id } });
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }
  async design(user: User, payload: any) {
    try {
      const isDesignExist = await this.fetchLatestDesignForCurrentUser(user);
      if (!isDesignExist) {
        const newDesign = this.designRepository.create();
      }
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }

  async deleteDesignForCurrentUser(
    user: User,
    id: string,
  ): Promise<SuccessResponse | undefined> {
    try {
      const design = await this.designRepository.findOne({
        where: {
          id,
          owner: {
            id: user.id,
          },
        },
      });
      if (!design) {
        throw new NotFoundException(`Design for current user does not exist`);
      }
      design.remove();
      return new SuccessResponse(
        design,
        'Design for current user deleted',
        HttpStatus.ACCEPTED,
      );
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }
  async deleteSingleDesign(id: string): Promise<SuccessResponse | undefined> {
    try {
      const design = await this.designRepository.findOneBy({ id });
      if (!design) {
        throw new NotFoundException(`Design with id ${id} does not exist `);
      }
      return new SuccessResponse(
        design,
        `Design with id ${id} deleted successfully `,
        HttpStatus.OK,
      );
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }

  async publishRecentDesign(
    user: User,
    payload: PublishDesignDto,
  ): Promise<Product | undefined> {
    try {
      const design = await this.fetchLatestDesignForCurrentUser(user);
      console.log(design);
      const product = await this.productService.createProduct(
        {
          name: payload.title,
          price: payload.price,
          description: payload.description,
          categoryId: payload.categoryId,
        },
        user,
      );
      this.design[0].published = true;
      await this.designRepository.save(design[0]);
      return product;
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }
  async publishRecentDesignAndCheckout(
    user: User,
    payload: PublishDesignAndCheckoutDto,
  ): Promise<
    | {
        authorization_url: string;
        access_code: string;
        reference: string;
      }
    | undefined
  > {
    try {
      const design = await this.fetchLatestDesignForCurrentUser(user);
      const product = await this.productService.createProduct(
        {
          name: payload.title,
          price: payload.price,
          description: payload.description,
          categoryId: payload.categoryId,
        },
        user,
      );
      //   set  design to published
      this.design[0].published = true;
      await this.designRepository.save(design[0]);
      //   save product to cart
      await this.cartService.createCartItem(
        { product: product.id, quantity: payload.quantity },
        user,
      );
      //   initialize payment
      const generatePaymentRef = await this.paystackBrokerService.createPayRef(
        user,
      );
      return generatePaymentRef;
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }
  public async createPolymailerContent(
    payload: string,
  ): Promise<PolyMailerContent | undefined> {
    try {
      const polymailer = this.polyMailerContentRepository.create({
        content: payload,
      });
      return await polymailer.save();
    } catch (err: any) {
      throw new HttpException(err.message, err.status);
    }
  }

  public async fetchPolymailerContents(): Promise<
    PolyMailerContent[] | undefined
  > {
    try {
      console.log('e reach here');
      return await this.polyMailerContentRepository.find();
    } catch (err: any) {
      throw new HttpException(err.message, err.status);
    }
  }
}
