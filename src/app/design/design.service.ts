import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
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
} from './dto/design.dto';
import { CartService } from '../cart/cart.service';
import { ProductService } from '../product/product.service';
import { PaystackBrokerService } from '../payment/paystack/paystack.service';
import { User } from '../users/entities/user.entity';
import { SuccessResponse } from 'src/utils/response';
import { Product } from '../product/product.entity';
import { PolyMailerContent } from '../order/entities/polymailer_content.entity';
import { Inject } from '@nestjs/common';
import { CLOUDINARY } from 'src/constant';
import { CloudinaryProvider } from 'src/providers/cloudinary.provider';
import { TEXT_TYPE, IMAGE_TYPE } from 'src/constant';
import { WsException } from '@nestjs/websockets/errors';
import { UserRecord } from 'firebase-admin/lib/auth/user-record';
@Injectable()
export class DesignService {
  constructor(
    @InjectRepository(Design)
    private readonly designRepository: Repository<Design>,
    private readonly cartService: CartService,
    private readonly productService: ProductService,
    private readonly paystackBrokerService: PaystackBrokerService,
    @Inject(CLOUDINARY)
    private readonly imageStorage: CloudinaryProvider,
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
  ): Promise<{ design: Design }> {
    try {
      const design = await this.designRepository.findOne({
        where: { owner: { id: user.id }, published: false },
      });

      console.log(design);
      return { design: design };
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }
  async fetchSingleDesign(id: string): Promise<Design> {
    try {
      const design = await this.designRepository.findOne({ where: { id } });
      if (!design) {
        throw new NotFoundException(
          `design with id ${id}  does  not exist or  deleted`,
        );
      }
      return design;
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }
  private async sortAssets(design: Design, payload: any) {
    // save updated assets
    try {
      for (let i in payload.objects) {
        if (payload.objects[i].type === TEXT_TYPE) {
          design.texts = [...design.texts, payload.objects[i].text];
        } else if (payload.objects[i].type === IMAGE_TYPE) {
          const image = await this.imageStorage.uploadPhoto(
            payload.objects[i].src,
            {
              asset_folder: design.owner.username,
              public_id_prefix: design.owner.username,
            },
          );

          design.images.push({
            public_id: image.public_id,
            url: image.secure_url,
          });
          // update image scr from design with online link  to be saved
          payload.objects[i].src = image.secure_url;
        } else {
          console.log('another kind of asset');
        }
      }
      design.design_data = payload;

      return design;
    } catch (error) {
      throw new WsException(error.message);
    }
  }

  // async contributeToDesign(user: User, payload: any, id: string) {
  //   try {
  //     const isDesignExist = await this.fetchSingleDesign(id);

  //     if (!isDesignExist) {
  //       throw new WsException('Design to contribute does not exist');
  //     }

  //     if (!isDesignExist.contributors.includes(user.email)) {
  //       throw new WsException('You are not an authorized contributor');
  //     }

  //     console.log('updating  design');
  //     isDesignExist.images = [];
  //     isDesignExist.texts = [];

  //     // delete old images from cloudinary
  //     await this.imageStorage.deletePhotosByPrefix(
  //       isDesignExist.owner.username,
  //     );
  //     let updatedDesign = await this.sortAssets(isDesignExist, payload);

  //     updatedDesign = await this.designRepository.save(updatedDesign);
  //     console.log(updatedDesign);
  //     return updatedDesign;
  //   } catch (err) {
  //     throw new WsException(err.message);
  //   }
  // }

  async design(user: User, payload: any, id?: string) {
    try {
      let isDesignExist: { design: Design };
      if (id) {
        isDesignExist = { design: await this.fetchSingleDesign(id) };
        if (
          !isDesignExist.design.contributors.includes(user.email)
        ) {
          throw new WsException('You are not an authorized contributor');
        }
      } else {
        isDesignExist = await this.fetchLatestDesignForCurrentUser(user);
      }

      if (!isDesignExist.design) {
        console.log('creating new design');
        const newDesign = this.designRepository.create({
          owner: user,
          texts: [],
          images: [],
        });

        const updatedDesign = await this.sortAssets(newDesign, payload);
        console.log('came back here', updatedDesign);
        return await this.designRepository.save(updatedDesign);
      } else {
        console.log('updating old design');
        isDesignExist.design.images = [];
        isDesignExist.design.texts = [];

        // delete old images from cloudinary
        await this.imageStorage.deletePhotosByPrefix(
          isDesignExist.design.owner.username,
        );
        let updatedDesign = await this.sortAssets(
          isDesignExist.design,
          payload,
        );

        updatedDesign = await this.designRepository.save(updatedDesign);
        console.log(updatedDesign);
        return updatedDesign;
      }
    } catch (err) {
      throw new WsException(err.message);
    }
  }

  async fetchMyDesign(id: string, user: User): Promise<Design> {
    try {
      const design = await this.designRepository.findOne({
        where: { id, owner: { id: user.id } },
      });
      if (!design) {
        throw new NotFoundException(
          `design with id ${id}  does  not exist or  deleted`,
        );
      }
      return design;
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }

  async addContributorsToDesign(
    payload: { emails: string[]; id: string },
    user: User,
  ): Promise<SuccessResponse> {
    try {
      const isDesign = await this.fetchMyDesign(payload.id, user);
      isDesign.contributors = [...isDesign.contributors, ...payload.emails];
      await this.designRepository.save(isDesign);
      return new SuccessResponse(
        payload.emails,
        'Contributor(s) added to design',
      );
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }
  async removeContributorsToDesign(
    payload: { emails: string[]; id: string },
    user: User,
  ): Promise<SuccessResponse> {
    try {
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
      if (design.published == true) {
        throw new NotFoundException(
          `Design already published as a product and might be present in pending orders`,
        );
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

  async publishDesign(
    user: User,
    payload: PublishDesignDto,
    id: string,
    category_id: string,
  ): Promise<Product | undefined> {
    try {
      const design = await this.fetchMyDesign(id, user);
      console.log(design);
      if (design.published == true) {
        throw new ConflictException('design already published');
      }
      const product = await this.productService.createProduct(
        {
          name: payload.title,
          price: payload.price,
          description: payload.description,
          categoryId: category_id,
        },
        user,
      );

      (product.isPublished = true), (design.product = product);
      design.published = true;

      await this.designRepository.save(design);
      return product;
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }
  async publishDesignAndCheckout(
    user: User,
    payload: PublishDesignAndCheckoutDto,
    id: string,
    category_id: string,
  ): Promise<
    | {
        authorization_url: string;
        access_code: string;
        reference: string;
      }
    | undefined
  > {
    try {
      const product = await this.publishDesign(user, payload, id, category_id);
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
