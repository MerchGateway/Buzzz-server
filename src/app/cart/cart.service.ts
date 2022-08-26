import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { Injectable, HttpException } from '@nestjs/common';
import { Cart } from './entities/cart.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
  ) {}

  public async getCartItems(user: User): Promise<Cart[] | undefined> {
    try {
      const cartItems = await this.cartRepository.find({
        where: { owner: { id: user.id } },
        relations: { owner: true },
      });
      return cartItems;
    } catch (err: any) {
      throw new HttpException(err.message, err.status);
    }
  }
}
