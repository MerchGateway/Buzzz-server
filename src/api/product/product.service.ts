import { Injectable, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';
import { Repository } from 'typeorm';
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
      if (product) {
        (product.name = body?.name || product.name),
          (product.price = body?.price || product.price);
        await product.save();
        return product;
      }
    } catch (err) {
      throw err;
    }
  }

  async handleSetVisibility(id: string) {
    try {
      const product = await this.handleGetAProduct(id);
      if (product) {
        product.isPublished = !product.isPublished;
        await product.save();
        return product;
      }
    } catch (err) {
      throw err;
    }
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
  async handleGetAllProducts() {
    const products = await this.productRepository.findAndCount();

    if (products) {
      return products;
    }
  }

  async handleQueryProducts(query: EditProductDto) {
    console.log('query', query);
    // const products = await this.productRepository.find();

    // if (products) {
    //   return products;
    // }
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
