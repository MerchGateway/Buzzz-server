import { Injectable, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';
import { Repository } from 'typeorm';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';
import { CreateProductDto, EditProductDto } from './product.dto';
import { Product } from './product.entity';

@Injectable()
export class ProductService {
  @InjectRepository(Product)
  private readonly productRepository: Repository<Product>;

  public createProduct(body: CreateProductDto) {
    const product: Product = new Product();
    product.name = body.name;
    product.price = body.price;

    return this.productRepository.save(product);
  }

  async handleEditProduct(body: EditProductDto, id: string) {
    try {
      const product = await this.handleGetAProduct(id);
      (product.name = body?.name || product.name),
        (product.price = body?.price || Number(product.price));
      await product.save();
      return product;
    } catch (err) {
      throw err;
    }
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
      .where('product.name = :name OR product.price = :price', {
        name: searchQuery?.name,
        price: searchQuery?.price,
      });

    return paginate<Product>(searchResult, { limit, page, route });
  }

  async handleGetAProduct(id: string) {
    try {
      const product = await this.productRepository.findOneByOrFail({ id });
      if (product) {
        return product;
      }
    } catch (err) {
      if (err instanceof EntityNotFoundError) {
        throw new ForbiddenException(
          'No product with this credentail(s) found',
        );
      } else {
        throw err;
      }
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
