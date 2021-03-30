import { Repository, EntityRepository } from "typeorm";
import { Product } from './entities/product.entity';

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
  findAll() {
    return this.find();
  }

  findOne(id) {
    return this.findOne(id);
  }
}
