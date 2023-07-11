import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';
import { CreateProductDto, EditProductDto } from './product.dto';
import { Product } from './product.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  public createProduct(body: CreateProductDto, user: User): Promise<Product> {
    const product: Product = new Product();
    product.name = body.name;
    product.price = body.price;
    product.categoryId = body.categoryId;
    product.seller = user;
    product.sellerId = user.id;
    product.description = body.description;
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
          categoryId: body.categoryId,
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
      .where('id= :id', { id: id })
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
    const searchResult = this.productRepository
      .createQueryBuilder('product')
      .where(
        'product.name = :name OR product.price = :price OR product.sellerId= :sellerId OR seller.username= :username ',
        {
          name: searchQuery?.name,
          price: searchQuery?.price,
          sellerId: searchQuery?.sellerId,
          username: searchQuery?.username,
        },
      );

    return paginate<Product>(searchResult, { limit, page, route });
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
    const fetch = this.productRepository.createQueryBuilder('p');
    fetch.orderBy('p.createdAt', 'ASC');

    return paginate<Product>(fetch, options);
  }

  async handleDeleteAProduct(id: string) {
    try {
      const product = await this.handleGetAProduct(id);
      if (product) {
        const deleteProd = await this.productRepository.remove(product);
        return deleteProd;
      }
    } catch (err) {
      throw err;
    }
  }
}
