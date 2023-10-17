import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable, HttpException, NotFoundException } from '@nestjs/common';
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
    const productItem = await this.product.handleGetAProduct(cartDto.product);

    if (!productItem) {
      throw new NotFoundException(
        `Product  with id ${cartDto.product} does not exist`,
      );
    }
    const isCart = await this.checkIfCartExist(cartDto.product);

    if (isCart) {
      isCart.quantity += cartDto.quantity;
      return await this.cartRepository.save(isCart);
    } else {
      const cartItem = this.cartRepository.create({
        user: user,
        quantity: cartDto.quantity,
        product: productItem,
        size: cartDto?.size,
        color: cartDto?.color,
      });

      return await this.cartRepository.save(cartItem);
    }
  }

  public async createMultipleCartItem(
    cartDto: CreateCartDto[],
    user: User,
  ): Promise<Cart[] | undefined> {
    try {
      const items = await Promise.all(
        cartDto.map(async (cart) => {
          const productItem = await this.product.handleGetAProduct(
            cart.product,
          );

          if (!productItem) {
            throw new NotFoundException(
              `Product  with id ${cart.product} does not exist`,
            );
          }

          const isCart = await this.checkIfCartExist(cart.product);
          if (isCart) {
            isCart.quantity += cart.quantity;
            return await this.cartRepository.save(isCart);
          } else {
            const cartItem = this.cartRepository.create({
              user: user,
              quantity: cart.quantity,
              product: productItem,
              size: cart?.size,
              color: cart?.color,
            });

            return await this.cartRepository.save(cartItem);
          }
        }),
      );
      return items;
    } catch (err: any) {
      throw new HttpException(err.message, err.status);
    }
  }

  private async checkIfCartExist(product: string) {
    // search if cart item exists already and update if it does
    //  fetch new instance of the just updated cart item
    return await this.cartRepository.findOne({
      where: {
        product: { id: product },
      },
      relations: { product: true },
    });
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
      cartDto.size && (cartItem.size = cartDto.size);

      return await this.cartRepository.save(cartItem);
    } catch (err: any) {
      throw new HttpException(err.message, err.status);
    }
  }
  public async getCartItems(user: User): Promise<Cart[] | undefined> {
    const cartItems = await this.cartRepository.find({
      where: { user: { id: user.id } },
      relations: { product: true },
    });
    return cartItems;
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
