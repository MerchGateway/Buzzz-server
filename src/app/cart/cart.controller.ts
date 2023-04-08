import {
  Controller,
  Get,
  Param,
  Delete,
  Post,
  ParseUUIDPipe,
  HttpStatus,
  HttpCode,
  Body,
  Patch,
  Put,
} from '@nestjs/common';
import { CurrentUser } from 'src/decorators/user.decorator';
import { User } from '../users/entities/user.entity';
import { CartService } from './cart.service';
import { Cart } from './entities/cart.entity';
import { CreateCartDto, UpdateCartDto } from './dto/cart.dto';
// import { Public } from 'src/decorators/public.decorator';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}
  @Get('')
  private getCartItems(@CurrentUser() user: User): Promise<Cart[] | undefined> {
    return this.cartService.getCartItems(user);
  }

  @Post('')
  @HttpCode(HttpStatus.CREATED)
  private createCartItem(
    @Body() createCartDto: CreateCartDto,
    @CurrentUser() user: User,
  ): Promise<Cart | undefined> {
    return this.cartService.createCartItem(createCartDto, user);
  }
  @Post('multiple-item')
  @HttpCode(HttpStatus.CREATED)
  private createMultipleCartItem(
    @Body() createCartDto: CreateCartDto[],
    @CurrentUser() user: User,
  ): Promise<Cart[] | undefined> {
    return this.cartService.createMultipleCartItem(createCartDto, user);
  }

  @Delete(':cartId')
  private deleteCartItem(
    @Param('cartId', ParseUUIDPipe) cartId: string,
  ): Promise<Cart | undefined> {
    return this.cartService.deleteCartItem(cartId);
  }

  @Get(':cartId')
  private getSingleCartItem(
    @Param('cartId', ParseUUIDPipe) cartId: string,
  ): Promise<Cart | undefined> {
    return this.cartService.getSingleCartItem(cartId);
  }

  @Put(':cartId')
  private updateCartItem(
    @Body() payload: UpdateCartDto,
    @Param('cartId', ParseUUIDPipe) cartId: string,
  ): Promise<Cart | undefined> {
    return this.cartService.updateCartItemQuantity(payload, cartId);
  }
}
