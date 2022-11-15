import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  Injectable,
  HttpException,
  NotFoundException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { Cart } from './entities/cart.entity';
import { User } from '../users/entities/user.entity';
import { CreateCartDto, UpdateCartDto } from '../cart/dto/cart.dto';
import { ProductService } from '../product/product.service';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,

    private readonly product: ProductService,
  ) {}

  public async createCartItem(
    cartDto: CreateCartDto,
    user: User,
  ): Promise<Cart | undefined> {
    try {
      const productItem = await this.product.handleGetAProduct(cartDto.product);

      if (!productItem) {
        throw new NotFoundException(
          `Product  with id ${cartDto.product} does not exist`,
        );
      }
      // search if cart item exists already and update if it does
      //  fetch new instance of the just updated cart item
      const isCart = await this.cartRepository.findOne({
        where: {
          product: { id: cartDto.product },
        },
        relations: { product: true },
      });

      if (isCart) {
        isCart.quantity += cartDto.quantity;
        return await this.cartRepository.save(isCart);
      } else {
        const cartItem = this.cartRepository.create({
          owner: user,
          quantity: cartDto.quantity,
          product: productItem,
        });

        return await this.cartRepository.save(cartItem);
      }
    } catch (err: any) {
      throw new HttpException(err.message, err.status);
    }
  }

  public async updateCartItemQuantity(
    cartDto: UpdateCartDto,
    cartId: string,
  ): Promise<Cart | undefined> {
    try {
      // first check if the needed cart item exists
      const cartItem = await this.getSingleCartItem(cartId);
      // update quantity if it exists
      cartItem.quantity = cartDto.quantity;
      return await this.cartRepository.save(cartItem);
    } catch (err: any) {
      throw new HttpException(err.message, err.status);
    }
  }
  public async getCartItems(user: User): Promise<Cart[] | undefined> {
    try {
      const cartItems = await this.cartRepository.find({
        where: { owner: { id: user.id } },
        relations: { product: true },
      });
      return cartItems;
    } catch (err: any) {
      throw new HttpException(err.message, err.status);
    }
  }

  public async getSingleCartItem(cartId: string): Promise<Cart | undefined> {
    try {
      const cartItem = await this.cartRepository.findOne({
        where: { id: cartId },
        relations: { product: true },
      });

      if (!cartItem) {
        throw new NotFoundException(
          `Cart item with id ${cartId} does not exist`,
        );
      }

      return cartItem;
    } catch (err: any) {
      throw new HttpException(err.message, err.status);
    }
  }

  public async deleteCartItem(cartId: string): Promise<Cart | undefined> {
    try {
      const cartItem = await this.cartRepository.findOne({
        where: { id: cartId },
        relations: { product: true },
      });

      if (!cartItem) {
        throw new NotFoundException(
          `Cart item with id ${cartId} does not exist`,
        );
      }

      await this.cartRepository.delete(cartId);

      return cartItem;
    } catch (err: any) {
      throw new HttpException(err.message, err.status);
    }
  }
}
