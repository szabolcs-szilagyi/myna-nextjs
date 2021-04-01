import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductRepository } from './product.repository';

import { catchAllOmiter } from './product.middleware';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductRepository]),
  ],
  providers: [ProductService],
  controllers: [ProductController],
})
export class ProductModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(catchAllOmiter)
      .forRoutes(ProductController)
  }
}
