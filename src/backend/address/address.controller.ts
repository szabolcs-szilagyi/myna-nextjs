import { Controller, Get, Inject } from '@nestjs/common';
import { CustomHeaders } from '../token/decorators/custom-headers.decorator';
import { PurifiedToken } from '../token/decorators/purified-token.decorator';
import { EmailStripperPipe } from '../token/pipes/email-stripper.pipe';
import { TokenService } from '../token/token.service';
import { AddressService } from './address.service';
import { Address } from './entities/address.entity';
import * as lodash from 'lodash/fp';

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

  @Get('address-data')
  async getAddressData(
    @PurifiedToken('session-token') sessionToken: string,
    @CustomHeaders('email', EmailStripperPipe) email: string,
  ) {
    const isSessionValid = await this.tokenService.validateSessionTokenStrict(sessionToken, email);

    let addressData: Address;
    if(isSessionValid) {
      addressData = await this.addressService.getAddressDataByEmail(email);
      addressData = lodash.omit(['id', 'sessionToken', 'email', 'name'], addressData);
    } else {
      addressData = {} as Address;
    }

    return addressData;
  }
}
