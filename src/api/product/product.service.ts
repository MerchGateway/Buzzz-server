import { Injectable, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './product.dto';
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

  async handleEditProduct(body: CreateProductDto, id: number) {
    try {
      const product = await this.handleGetAProduct(id);
      if (product) {
        return this.productRepository.update(
          { id },
          { name: body?.name, price: body?.price },
        );
      }
    } catch (err) {
      throw err;
    }
  }

  async handleSetVisibility(id: number) {
    try {
      const product = await this.handleGetAProduct(id);
      if (product) {
        console.log(product);
        product.isPublished = !product.isPublished;
        const visibility = await this.productRepository.update(
          { id },
          { isPublished: product.isPublished },
        );
        return visibility;
      }
    } catch (err) {
      throw err;
    }
  }

  async handleGetAProduct(id: number) {
    try {
      const product = await this.productRepository.findOneByOrFail({ id });
      if (product) {
        return product;
      } else {
        throw new ForbiddenException('No product with this credentails found ');
      }
    } catch (err) {
      throw err;
    }
  }
  async handleGetAllProducts() {
    const products = await this.productRepository.findAndCount();

    if (products) {
      return products;
    }
  }

  async handleDeleteAProduct(id: number) {
    try {
      const product = await this.handleGetAProduct(id);
      if (product) {
        const deleteProd = await this.productRepository.remove(product);
        return deleteProd;
      } else {
        throw new ForbiddenException('No product with this credentails found ');
      }
    } catch (err) {
      throw err;
    }
  }
}
