import { Controller, NotFoundException, Get, Req, Query } from '@nestjs/common';
import { Request } from 'express';
import got from 'got';

enum PartOption {
  GetProductData = 'getproductdata',
  GetCurrency = 'getcurrency',
  LoginMail = 'loginmail',
  Login = 'login',
  Ping = 'ping',
  AmILoggedIn = 'amiloggedin',
  Logout = 'logout',
  GetUserData = 'getuserdata',
  UpdateUserData = 'updateuserdata',
  GetShippingInfo = 'getshippinginfo',
  GetEmail = 'getemail',
  GetAddressData = 'getaddressdata',
  SetAddressData = 'setaddressdata',
  DelAddressData = 'deladdressdata',
  SetSessionToken = 'setsessiontoken',
  SetNewsletterSubscription = 'setnewslettersubscription',
  GetNewsletterSubscription = 'getnewslettersubscription',
  ConfirmNewsletterSubscription = 'confirmnewslettersubscription',
  DelNewsletterSubscription = 'delnewslettersubscription',
  AddProductToCart = 'addproducttocart',
  DelProductFromCart = 'delproductfromcart',
  GetProductToMail = 'getproducttomail',
  GetProductsInCart = 'getproductsincart',
  GetProductsNumberInCart = 'getproductsnumberincart',
  SetProductPaid = 'setproductpaid',
  Availability = 'availability',
  AvailabilityExact = 'availabilityexact',
  OnStock = 'onstock',
  TotalCheckout = 'totalcheckout',
  ReduceStock = 'reducestock',
  GetAmountInCart = 'getamountincart',
  SetAmountInCart = 'setamountincart',
}

@Controller()
export class AppController {
  @Get('legacy')
  async legacyRouter(
    @Req() req: Request,
    @Query('part') part: PartOption,
  ) {
    switch (part) {
      case PartOption.GetProductData:
        const result = await got.get('http://localhost:3000/api/product', {
          searchParams: { idName: req.query.productname },
        }).json()

        return { productdetails: result[0] };
      case PartOption.GetCurrency:
        return { currency: '€' };
      case PartOption.LoginMail:
        return got.post('http://localhost:3000/api/token/mail-login', {
          isStream: true,
          json: { email: req.query.email },
          responseType: 'json',
        });
      default:
        throw new NotFoundException();
    }
  }
}
