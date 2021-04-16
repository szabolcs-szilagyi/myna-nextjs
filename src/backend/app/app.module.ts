import { MiddlewareConsumer, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AddressModule } from "../address/address.module";
import { CartController } from "../cart/cart.controller";
import { CartModule } from "../cart/cart.module";
import { NewsletterModule } from "../newsletter/newsletter.module";
import { ProductController } from "../product/product.controller";
import { ProductModule } from "../product/product.module";
import { TokenController } from "../token/token.controller";
import { TokenModule } from "../token/token.module";
import { UserModule } from "../user/user.module";
import { AppController } from './app.controller';
import { catchAllOmiter } from "./app.middleware";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'myca_xdb',
      password: 'ud8UuUIpLJdS9Q!R',
      database: 'myca_xdb',
      autoLoadEntities: true,
      synchronize: false,
    }),
    AddressModule,
    CartModule,
    NewsletterModule,
    ProductModule,
    TokenModule,
    UserModule,
  ],
  controllers: [AppController],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(catchAllOmiter)
      .forRoutes('*')
  }
}
