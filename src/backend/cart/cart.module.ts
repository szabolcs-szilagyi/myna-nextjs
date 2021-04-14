import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartRepository } from './cart.repository';
import { StockRepository } from './stock.repository';
import { PurchasedRepository } from './purchased.repository';
import { TokenModule } from '../token/token.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CartRepository,
      StockRepository,
      PurchasedRepository,
    ]),
    TokenModule,
  ],
  controllers: [CartController],
  providers: [CartService]
})
export class CartModule {}
