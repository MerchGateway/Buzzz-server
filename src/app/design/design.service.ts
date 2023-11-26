import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import {
  BadRequestException,
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Design } from './entities/design.entity';
import {
  PublishDesignDto,
  PublishDesignAndCheckoutDto,
  PublishAndGiftDto,
} from './dto/design.dto';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { CartService } from '../cart/cart.service';
import { ProductService } from '../product/product.service';
import { PaystackBrokerService } from '../payment/paystack/paystack.service';
import { User } from '../users/entities/user.entity';
import { SuccessResponse } from 'src/utils/response';
import { PolymailerContent } from '../order/entities/polymailer-content.entity';
import { Inject } from '@nestjs/common';
import { CLOUDINARY, EVENT_QUEUE, DESIGN_MERCH } from 'src/constant';
import { CloudinaryProvider } from 'src/providers/cloudinary.provider';
import { TEXT_TYPE, IMAGE_TYPE } from 'src/constant';
import { WsException } from '@nestjs/websockets/errors';
import { Role } from 'src/types/general';
import { FeeService } from '../fee/fee.service';
import { Product } from '../product/entities/product.entity';
import { GiftService } from '../gifting/gift.service';
@Injectable()
export class DesignService {
  constructor(
    @InjectQueue(EVENT_QUEUE)
    private readonly queue: Queue,
    @InjectRepository(Design)
    private readonly designRepository: Repository<Design>,
    private readonly cartService: CartService,
    private readonly productService: ProductService,
    private readonly giftService: GiftService,
    private readonly paystackBrokerService: PaystackBrokerService,
    @Inject(CLOUDINARY)
    private readonly imageStorage: CloudinaryProvider,
    @InjectRepository(PolymailerContent)
    private readonly polyMailerContentRepository: Repository<PolymailerContent>,
    private readonly feeService: FeeService,
  ) {}

  async viewAllDesigns(user: User): Promise<Design[] | undefined> {
    return await this.designRepository.find({
      where: { user: { id: user.id } },
      order: { updatedAt: 'DESC' },
    });
  }

  async fetchLatestDesignForCurrentUser(
    user: User,
  ): Promise<{ design: Design }> {
    const latestDesign = await this.designRepository.findOne({
      where: { user: { id: user.id } },
      order: { createdAt: 'DESC' },
      relations: ['product'],
    });
    return { design: latestDesign };
  }

  async fetchSingleDesign(id: string): Promise<Design> {
    try {
      const design = await this.designRepository.findOne({ where: { id } });
      if (!design) {
        throw new NotFoundException(
          `Design with id ${id}  does  not exist or  deleted`,
        );
      }
      return design;
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }

  async sortAssets(design: Design, payload: any) {
    // save updated assets
    try {
      for (const i in payload.objects) {
        if (payload.objects[i].type === TEXT_TYPE) {
          design.texts = [...design.texts, payload.objects[i].text];
        } else if (payload.objects[i].type === IMAGE_TYPE) {
          const image = await this.imageStorage.uploadPhoto(
            payload.objects[i].src,
            {
              asset_folder: design.user ? design.user.username : design.id,
              public_id_prefix: design.id,
            },
          );

          design.images.push({
            publicId: image.public_id,
            url: image.secure_url,
          });
          // update image scr from design with online link  to be saved
          payload.objects[i].src = image.secure_url;
        } else {
          console.log('another kind of asset');
        }
      }
      design.designData = payload;
      design = await this.designRepository.save(design);
      return design;
    } catch (error) {
      throw new WsException(error.message);
    }
  }

  async design(payload: any, user?: User, id?: string) {
    try {
      return await this.queue.add(DESIGN_MERCH, { user, payload, id });
    } catch (error) {
      throw new WsException(error.message);
    }
  }

  async fetchTemplates(): Promise<Design[]> {
    try {
      const authRoles = [Role.ADMIN, Role.SUPER_ADMIN, Role.PUBLISHER];
      return await this.designRepository.find({
        where: {
          user: { role: In([...authRoles]) },
        },
      });
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }

  async useTemplate(id: string, user: User): Promise<Design> {
    const template = await this.fetchSingleDesign(id);
    console.log(template);
    const formattedTemplate = { ...template, owner: user };
    delete formattedTemplate.id;
    console.log(formattedTemplate);
    const newDesign = this.designRepository.create(formattedTemplate);
    return await this.designRepository.save(newDesign);
  }

  async fetchMyDesign(id: string, user: User): Promise<Design> {
    const design = await this.designRepository.findOne({
      where: { id, user: { id: user.id } },
    });
    if (!design) {
      throw new NotFoundException(
        `Design with id ${id}  does  not exist or  deleted`,
      );
    }
    return design;
  }

  async addContributorsToDesign(
    payload: { emails: string[]; id: string },
    user: User,
  ) {
    const isDesign = await this.fetchMyDesign(payload.id, user);
    isDesign.contributors = [...isDesign.contributors, ...payload.emails];
    await this.designRepository.save(isDesign);
    return new SuccessResponse(
      payload.emails,
      'Contributor(s) added to design',
    );
  }

  async removeContributorsToDesign(
    payload: { emails: string[]; id: string },
    user: User,
  ) {
    const isDesign = await this.fetchMyDesign(payload.id, user);
    isDesign.contributors = isDesign.contributors.filter(
      (contributor: string) => {
        if (
          !payload.emails.includes(contributor) ||
          user.email === contributor
        ) {
          return contributor;
        }
      },
    );
    await this.designRepository.save(isDesign);
    return new SuccessResponse(
      payload.emails,
      'Contributor(s) removed from design',
    );
  }

  async deleteDesignForCurrentUser(user: User, id: string) {
    const design = await this.designRepository.findOne({
      where: {
        id,
        user: {
          id: user.id,
        },
      },
    });
    if (!design) {
      throw new NotFoundException(`Design for current user does not exist`);
    }
    if (design.published == true) {
      throw new NotFoundException(
        `You cannot delete an already published  design`,
      );
    }
    design.remove();
    return new SuccessResponse(
      design,
      'Design for current user deleted',
      HttpStatus.ACCEPTED,
    );
  }
  async deleteSingleDesign(id: string) {
    const design = await this.designRepository.findOneBy({ id });
    if (!design) {
      throw new NotFoundException(`Design with id ${id} does not exist `);
    }
    if (design.published == true) {
      throw new NotFoundException(
        `Design already published as a product and might be present in pending orders`,
      );
    }
    return new SuccessResponse(
      design,
      `Design with id ${id} deleted successfully `,
    );
  }

  async publishDesign(
    user: User,
    payload: PublishDesignDto,
    id: string,
    category_id: string,
  ) {
    const design = await this.fetchMyDesign(id, user);

    if (!user.emailVerified) {
      throw new BadRequestException(
        `Please verify your email to publish your designs`,
      );
    }

    if (design.published == true) {
      throw new ConflictException('Design already published');
    }

    const fee = await this.feeService.getLatest();

    if (payload.price <= fee.reseller) {
      throw new BadRequestException(
        `Design price must be greater than the mandatory fee of ₦${fee.reseller}.`,
      );
    }

    const product = await this.productService.createProduct(
      {
        name: payload.title,
        price: payload.price,
        isPublic: payload.isPublic,
        description: payload.description,
        categoryId: category_id,
        thumbnail: payload.thumbnail,
      },
      user,
    );

    product.isPublished = true;
    design.product = product;
    design.published = true;

    await this.designRepository.save(design);
    return product;
  }

  async publishAndGift(
    user: User,
    payload: PublishAndGiftDto,
    id: string,
    category_id: string,
  ): Promise<{
    authorization_url: string;
    access_code: string;
    reference: string;
  }> {
    const data = { ...payload, isPublic: false };
    const product = await this.publishDesign(user, data, id, category_id);
    const createGiftPayload = {
      product: product.id,
      recievers: payload.recievers,
    };
    return await this.giftService.createGift(createGiftPayload, user);
  }

  async publishDesignAndCheckout(
    user: User,
    payload: PublishDesignAndCheckoutDto,
    id: string,
    category_id: string,
  ): Promise<Product> {
    const fee = await this.feeService.getLatest();

    if (payload.price !== fee.owner) {
      throw new BadRequestException(
        `Design price must be the exact mandatory fee of ₦${fee.owner}.`,
      );
    }
    const product = await this.publishDesign(user, payload, id, category_id);
    //   save product to cart
    await this.cartService.createCartItem(
      {
        product: product.id,
        quantity: payload.quantity,
        color: payload?.color,
        size: payload?.size,
      },
      user,
    );

    return product;
  }

  public async createPolymailerContent(
    payload: { content: string }[],
  ): Promise<PolymailerContent[] | undefined> {
    const polyMailers = this.polyMailerContentRepository.create(payload);
    return polyMailers;
  }

  public async fetchPolymailerContents(): Promise<
    PolymailerContent[] | undefined
  > {
    return await this.polyMailerContentRepository.find();
  }

  async attachDesignToUser(user: User, designId: string) {
    const design = await this.fetchSingleDesign(designId);
    design.user = user;
    await design.save();

    return new SuccessResponse(
      design,
      `Design with id ${designId} attached to user ${user.id}`,
    );
  }
}
