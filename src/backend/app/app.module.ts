import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductModule } from "../product/product.module";

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
    ProductModule,
  ],
})
export class AppModule {}
