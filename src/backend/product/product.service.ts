import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductFilterDto } from './dto/product-filter.dto';
import { Product } from './entities/product.entity';
import { ProductRepository } from './product.repository';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductRepository)
    private productRepository: ProductRepository
  ) {}

  findAll(productFilterDto: ProductFilterDto): Promise<Product[]> {
    return this.productRepository.find(productFilterDto);
  }

  findOne(id: number): Promise<Product> {
    return this.productRepository.findOne(id);
  }
}
