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

  async handleQueryProducts(query: any) {
    const allProducts = await this.handleGetAllProducts();
    const filters = query;

    const filteredUsers = allProducts[0].filter((product) => {
      let isValid = true;
      for (const key in filters) {
        console.log(key, product[key], filters[key]);
        isValid = isValid && product[key] == filters[key];
      }
      return isValid;
    });
    return filteredUsers;
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
