import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsUtils, Repository } from 'typeorm';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';
import { CreateProductDto, EditProductDto } from './dto/product.dto';
import { Product } from './entities/product.entity';
import { User } from '../users/entities/user.entity';
import { CloudinaryProvider } from 'src/providers/cloudinary.provider';
import { CLOUDINARY } from 'src/constant';
import { UploadApiResponse } from 'cloudinary';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @Inject(CLOUDINARY)
    private readonly imageStorage: CloudinaryProvider,
  ) {}

  public async createProduct(
    body: CreateProductDto,
    user: User,
  ): Promise<Product> {
    const image = (await this.imageStorage.uploadPhoto(body.thumbnail, {
      asset_folder: user.username,
      public_id_prefix: 'thumbnail',
    })) as UploadApiResponse;

    const product: Product = new Product();
    product.name = body.name;
    product.price = body.price;
    product.category = body.categoryId as any;
    product.seller = user;
    product.seller = user.id as any;
    product.description = body.description;
    product.thumbnail = {
      publicId: image.public_id,
      url: image.secure_url,
    };
    return this.productRepository.save(product);
  }

  async handleEditProduct(body: EditProductDto, id: string) {
    try {
      const product = await this.handleGetAProduct(id);
      await this.productRepository
        .createQueryBuilder('updateP')
        .update()
        .where('id= :id', { id: product.id })
        .set({
          name: body.name,
          price: body.price,
          category: { id: body.categoryId },
          description: body.description,
        })
        .execute();
      return await this.handleGetAProduct(id);
    } catch (err) {
      throw err;
    }
  }

  async handleUpdatePaymentRecord(receiptId: string, id: string) {
    await this.productRepository
      .createQueryBuilder('addPayrecord')
      .update()
      .where('id = :id', { id: id })
      .set({
        receiptId,
        purchased: true,
      })
      .execute();
    return await this.handleGetAProduct(id);
  }

  async handleSetVisibility(id: string) {
    try {
      const product = await this.handleGetAProduct(id);
      product.isPublished = !product.isPublished;
      await product.save();
      return product;
    } catch (err) {
      throw err;
    }
  }

  async handleQueryProducts(
    { limit, page, route }: IPaginationOptions,
    searchQuery: any,
  ) {
    const qb = this.productRepository.createQueryBuilder('product');
    FindOptionsUtils.joinEagerRelations(
      qb,
      qb.alias,
      this.productRepository.metadata,
    );
    qb.where(
      'product.name = :name OR product.price = :price OR product.sellerId= :sellerId OR seller.username= :username ',
      {
        name: searchQuery?.name,
        price: searchQuery?.price,
        sellerId: searchQuery?.sellerId,
        username: searchQuery?.username,
      },
    );
    qb.orderBy('p.createdAt', 'DESC');

    return paginate<Product>(qb, { limit, page, route });
  }
  async handleGetAProduct(id: string) {
    try {
      const product = await this.productRepository.findOne({
        where: { id },
        relations: {
          receipt: true,
        },
      });
      if (!product) {
        throw new NotFoundException('No product with this credentail(s) found');
      }
      return product;
    } catch (err) {
      throw err;
    }
  }

  async handleGetAllProducts(
    options: IPaginationOptions,
  ): Promise<Pagination<Product>> {
    const qb = this.productRepository.createQueryBuilder('p');
    FindOptionsUtils.joinEagerRelations(
      qb,
      qb.alias,
      this.productRepository.metadata,
    );
    qb.where('p.isPublic = :isPublic', { isPublic: true });
    qb.orderBy('p.createdAt', 'DESC');

    return paginate<Product>(qb, options);
  }

  async updateAvailability(id: string, { inStock }) {
    try {
      const product = await this.handleGetAProduct(id);
      product.inStock = inStock;
      return await product.save();
    } catch (err) {
      throw err;
    }
  }
}
