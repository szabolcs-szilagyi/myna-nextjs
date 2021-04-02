import { Controller, Get, Inject, Param, ParseIntPipe, Query, ValidationPipe } from '@nestjs/common';
import { Product } from './entities/product.entity';
import { ProductService } from './product.service';
import { ProductFilterDto } from './dto/product-filter.dto';

@Controller('product')
export class ProductController {
  constructor(
    @Inject(ProductService)
    private productService: ProductService
  ) {}

  @Get()
  getProductData(
    @Query(ValidationPipe) productFilterDto: ProductFilterDto
  ) {
    console.log(productFilterDto);
    return this.productService.findAll(productFilterDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Product> {
    return this.productService.findOne(id);
  }
}
