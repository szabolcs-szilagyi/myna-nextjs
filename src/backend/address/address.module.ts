import { Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressRepository } from './address.repository';
import { TokenService } from '../token/token.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([AddressRepository]),
    TokenService,
  ],
  providers: [AddressService],
  controllers: [AddressController],
})
export class AddressModule {}
