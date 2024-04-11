import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
	Injectable,
	HttpException,
	NotFoundException,
	BadRequestException,
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

		private readonly product: ProductService
	) {}

	public async createCartItem(
		cartDto: CreateCartDto,
		user: User
	): Promise<Cart | undefined> {
		const productItem = await this.product.handleGetAProduct(cartDto.product);

		if (!productItem) {
			throw new NotFoundException(
				`Product  with id ${cartDto.product} does not exist`
			);
		}

		const cartItem = this.cartRepository.create({
			user: user,
			quantity: cartDto.quantity,
			product: productItem,
			size: cartDto?.size,
			color: cartDto.color,
		});

		return await this.cartRepository.save(cartItem);
	}

	public async createMultipleCartItem(
		cartDto: CreateCartDto[],
		user: User
	): Promise<Cart[] | undefined> {
		try {
			const items = await Promise.all(
				cartDto.map(async (cart) => {
					const productItem = await this.product.handleGetAProduct(
						cart.product
					);

					if (!productItem) {
						throw new NotFoundException(
							`Product  with id ${cart.product} does not exist`
						);
					}

					const cartItem = this.cartRepository.create({
						user: user,
						quantity: cart.quantity,
						product: productItem,
						size: cart?.size,
						color: cart.color,
					});

					return await this.cartRepository.save(cartItem);
				})
			);
			return items;
		} catch (err: any) {
			throw new HttpException(err.message, err.status);
		}
	}

	private async checkIfCartExist(userId: string, productId: string) {
		// search if cart item exists already for the specific user and update if it does
		// fetch new instance of the just updated cart item
		return await this.cartRepository.findOne({
			where: {
				user: { id: userId },
				product: { id: productId },
			},
			relations: { product: true },
		});
	}

	public async updateCartItemQuantity(
		cartDto: UpdateCartDto,
		cartId: string
	): Promise<Cart | undefined> {
		// first check if the needed cart item exists
		const cartItem = await this.getSingleCartItem(cartId);
		// update quantity if it exists
		cartItem.quantity = cartDto.quantity;
		cartDto.size && (cartItem.size = cartDto.size);

		if (
			!cartItem.product.customizationInstructions &&
			cartDto.creatorInstructions
		) {
			throw new BadRequestException('Product does not support customization');
		}

		cartItem.creatorInstructions = cartDto.creatorInstructions;

		return await this.cartRepository.save(cartItem);
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
					`Cart item with id ${cartId} does not exist`
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
					`Cart item with id ${cartId} does not exist`
				);
			}

			await this.cartRepository.delete(cartId);

			return cartItem;
		} catch (err: any) {
			throw new HttpException(err.message, err.status);
		}
	}
}
