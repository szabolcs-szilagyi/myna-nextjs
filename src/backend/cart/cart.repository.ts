import { EntityRepository, Repository } from "typeorm";
import { CartEntity } from "./entities/cart.entity";

@EntityRepository(CartEntity)
export class CartRepository extends Repository<CartEntity> {
  /**
   * WARNING: return non paid items only
   */
  async getProductsInCart(sessionToken: string): Promise<CartEntity[]> {
    const products = await this.find({
      where: { sessionToken, paid: 0 },
      order: { id: 'ASC' },
    });

    return products;
  }

  async setProductPaid(product: CartEntity): Promise<void> {
    await this.update({ id: product.id }, { paid: 1 });
  }
}
