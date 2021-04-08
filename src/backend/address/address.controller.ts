import { Controller, Get, Inject, UnauthorizedException } from '@nestjs/common';
import { PurifiedToken } from '../token/decorators/purified-token.decorator';
import { TokenService } from '../token/token.service';
import { AddressService } from './address.service';

@Controller('address')
export class AddressController {
  constructor(
    @Inject(AddressService)
    private readonly addressService: AddressService,
    @Inject(TokenService)
    private readonly tokenService: TokenService,
  ) {}

  @Get('shipping-info')
  async getShippingInfo(
    @PurifiedToken('session-token') sessionToken: string,
  ) {
    const email = await this.tokenService.getEmailBySessionToken(sessionToken);
    const address = await this.addressService.getAddressDataByEmail(email);
    const shippingInfo = this.addressService.getShippingInfo(address?.country);

    return { shippinginfo: shippingInfo };
  }
}
