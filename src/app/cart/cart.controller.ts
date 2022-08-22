import { Controller, Get } from '@nestjs/common';
import { CurrentUser } from 'src/decorators/user.decorator';
import { User } from '../users/entities/user.entity';
import { CartService } from './cart.service';
import { Cart } from './entities/cart.entity';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}
  @Get('')
  private getCartItems(@CurrentUser() user: User): Promise<Cart[] | undefined> {
    return this.cartService.getCartItems(user);
  }
}
