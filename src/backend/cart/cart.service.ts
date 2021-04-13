import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartRepository } from './cart.repository';
import { AddToCartDto } from './dto/add-to-cart.dto';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartRepository)
    private readonly cartRepository: CartRepository,
  ) {}

  async addProductToCart(
    addToCartDto: AddToCartDto,
    sessionToken: string
  ): Promise<void> {
    await this.cartRepository.insert({
      ...addToCartDto,
      sessionToken,
      amount: 1,
      paid: false,
    });
  }

  async removeProductFromCart(id: number, sessionToken: string): Promise<void> {
    await this.cartRepository.delete({ id, sessionToken })
  }

  /**
   * WARNING: bad naming
   *
   * Says purchased products, but it looks for products in the _cart_ table that
   * were not yet paid.
   */
  async getPurchasedProducts(sessionToken: string) {
    const products = await this.cartRepository.find({
      where: { sessionToken, paid: false },
      select: ['idName', 'size'],
    });

    return products;
  }
}
