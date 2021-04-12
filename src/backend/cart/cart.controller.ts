import { Controller, Post, Body, Inject, BadRequestException } from '@nestjs/common';
import { PurifiedToken } from '../token/decorators/purified-token.decorator';
import { CartService } from './cart.service';
import { AddToCartDto } from './dto/add-to-cart.dto';

@Controller('cart')
export class CartController {
  constructor(
    @Inject(CartService)
    private readonly cartService: CartService
  ) {}

  @Post()
  async addProduct(
    @PurifiedToken('session-token') sessionToken: string,
    @Body() addToCartDto: AddToCartDto,
  ) {
    if(!addToCartDto.idName || !addToCartDto.size || !sessionToken) throw new BadRequestException();

    await this.cartService.addProductToCart(addToCartDto, sessionToken);

    return { success: '1' };
  }
}
