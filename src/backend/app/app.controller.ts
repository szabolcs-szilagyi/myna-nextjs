import { Controller, NotFoundException, Get, Req, Query, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import got from 'got';
import { isEmpty, pick } from 'lodash';
import { AddressDataDto } from '../address/dto/address-data.dto';
import { AddToCartDto } from '../cart/dto/add-to-cart.dto';
import { CartEntity } from '../cart/entities/cart.entity';
import { PurchaseEmailDto } from '../email/dto/purchase-email.dto';
import { ProductEntity } from '../product/entities/product.entity';

enum PartOption {
  GetProductData = 'getproductdata',
  GetCurrency = 'getcurrency',
  LoginMail = 'loginmail',
  Login = 'login',
  Ping = 'ping',
  AmILoggedIn = 'amiloggedin',
  Logout = 'logout', // not used!
  GetUserData = 'getuserdata',
  UpdateUserData = 'updateuserdata',
  GetShippingInfo = 'getshippinginfo',
  GetEmail = 'getemail',
  GetAddressData = 'getaddressdata',
  SetAddressData = 'setaddressdata',
  DelAddressData = 'deladdressdata', // not implemented
  SetSessionToken = 'setsessiontoken',
  SetNewsletterSubscription = 'setnewslettersubscription',
  GetNewsletterSubscription = 'getnewslettersubscription', // not used
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
  OnStock = 'onstock', // not used
  TotalCheckout = 'totalcheckout',
  ReduceStock = 'reducestock', // not used
  GetAmountInCart = 'getamountincart', // not used
  SetAmountInCart = 'setamountincart', // not used

  PurchasedEmail = 'purchased',
}

@Controller()
export class AppController {
  private readonly host: string;
  private readonly forwardGot: typeof got;

  constructor(
    private readonly configService: ConfigService,
  ) {
    this.host = this.configService.get('next-js.SERVER_ADDRESS');
    this.forwardGot = got.extend({
      prefixUrl: this.host,
    });
  }

  @Get('legacy')
  async legacyRouter(
    @Req() req: Request,
    @Query('part') part: PartOption,
  ) {
    switch (part) {
      case PartOption.GetProductData:
        return this.forwardGot.get('api/product', {
          searchParams: { idName: req.query.productname },
          responseType: 'json',
        })
            .then(({ body }) => {
              const product = body[0] as ProductEntity;
              const productdetails = {
                id: product.id,
                productname: product.name,
                productcolor: product.color,
                productprice: product.price,
                desclong: product.description,
                compcare: product.compCare,
                availability: product.availability,
                is_one_size: product.isOneSize,
                pic1: product.pic1,
                pic2: product.pic2,
                pic3: product.pic3,
                pic4: product.pic4,
                pic5: product.pic5,
                pic6: product.pic6,
                pic7: product.pic7,
                pic8: product.pic8,
                pic9: product.pic9,
              };

              return { productdetails };
            });

      case PartOption.GetCurrency:
        return { currency: '€' };

      case PartOption.LoginMail:
        return this.forwardGot.post('api/token/mail-login', {
          isStream: true,
          json: { email: req.query.email },
        });

      case PartOption.Login:
        return this.forwardGot.post('api/token/login', {
          isStream: true,
          json: { email: req.query.email },
          headers: {
            'session-token': req.query.sessiontoken,
            'login-token': req.query.logintoken,
          },
        });

      case PartOption.Ping:
        return this.forwardGot.get('api/token/ping', {
          isStream: true,
          headers: {
            'session-token': req.query.sessiontoken,
          },
        });

      case PartOption.AmILoggedIn:
        return this.forwardGot.get('api/token/am-i-logged-in', {
          isStream: true,
          headers: {
            'session-token': req.query.sessiontoken,
          },
        });

      case PartOption.GetUserData:
        return this.forwardGot.get('api/token/get-user-data', {
          headers: {
            'session-token': req.query.sessiontoken,
            'email': req.query.email,
          },
          responseType: 'json',
        })
            .then(({ body }) => {
              const {
                email,
                firstName: firstname,
                lastName: lastname,
                lastLogin: lastlogin,
                birthday
              } = body as any;

              return {
                userdata: { email, firstname, lastname, lastlogin, birthday },
              };
            });

      case PartOption.UpdateUserData:
        return this.forwardGot.post('api/token/update-user-data', {
          isStream: true,
          headers: {
            'session-token': req.query.sessiontoken,
          },
          json: {
            email: req.query.email,
            firstName: req.query.firstname,
            lastName: req.query.lastname,
            birthday: req.query.birthday,
          }
        });

      case PartOption.GetShippingInfo:
        return this.forwardGot.get('api/address/shipping-info', {
          isStream: true,
          headers: {
            'session-token': req.query.sessiontoken,
          },
        });

      case PartOption.GetEmail:
        return this.forwardGot.get('api/token/get-email', {
          isStream: true,
          headers: {
            'session-token': req.query.sessiontoken,
          },
        });

      case PartOption.GetAddressData:
        return this.forwardGot.get('api/address/address-data', {
          headers: {
            'session-token': req.query.sessiontoken,
            'email': req.query.email,
          },
          responseType: 'json',
        })
            .then(({ body }) => {
              if(isEmpty(body)) return { addressdata: '0', success: '0', email: req.query.email }

              const addressData = body as AddressDataDto;

              return  {
                addressdata: {
                  type: addressData.type.toString(),
                  email: req.query.email,
                  session_token: req.query.sessiontoken,
                  mobile: addressData.mobile,
                  address1: addressData.addressLine1,
                  address2: addressData.addressLine2,
                  city: addressData.city,
                  state: addressData.state,
                  zip: addressData.zip,
                  country: addressData.country,
                  comment: addressData.comment,
                },
                success: '1',
                email: req.query.email,
              }
            })

      case PartOption.SetAddressData:
        return this.forwardGot.post('api/address/address-data', {
          headers: {
            'session-token': req.query.sessiontoken,
          },
          responseType: 'json',
          json: <AddressDataDto>{
            name: req.query.name,
            mobile: req.query.mobile,
            email: req.query.email,
            addressLine1: req.query.address1,
            addressLine2: req.query.address2,
            city: req.query.city,
            state: req.query.state,
            country: req.query.country,
            zip: req.query.zip,
            comment: req.query.comment,
            type: 1,
          }
        })
            .then(({ body }) => ({ success: (<any>body).success ? '1' : '0' }))

      case PartOption.SetSessionToken:
        return this.forwardGot.get('api/token/session', { isStream: true });

      case PartOption.SetNewsletterSubscription:
        return this.forwardGot.post('api/newsletter/subscribe', {
          isStream: true,
          throwHttpErrors: false,
          json: {
            email: req.query.email,
          }
        });

      case PartOption.ConfirmNewsletterSubscription:
        return this.forwardGot.get('api/newsletter/confirm', {
          isStream: true,
          throwHttpErrors: false,
          searchParams: {
            token: req.query.token,
          }
        });

      case PartOption.DelNewsletterSubscription:
        return this.forwardGot.get('api/newsletter/unsubscribe', {
          isStream: true,
          throwHttpErrors: false,
          searchParams: {
            email: req.query.email,
            token: req.query.token,
          }
        });

      case PartOption.AddProductToCart:
        return this.forwardGot.post('api/cart', {
          isStream: true,
          throwHttpErrors: false,
          headers: {
            'session-token': req.query.sessiontoken,
          },
          json: <AddToCartDto>{
            idName: req.query.idname,
            size: req.query.size === 'one_size' ? 'onesize' : req.query.size,
          },
        });

      case PartOption.DelProductFromCart:
        return this.forwardGot.delete('api/cart/' + req.query.id, {
          throwHttpErrors: false,
          headers: {
            'session-token': req.query.sessiontoken,
          },
        })
            .then(({ statusCode }) => {
              if(statusCode === 200) return { success: '1' };
              if(statusCode === 400) throw new BadRequestException();
            });

      case PartOption.GetProductToMail:
        return this.forwardGot.get('api/cart/products-in-cart', {
          throwHttpErrors: false,
          responseType: 'json',
          headers: {
            'session-token': req.query.sessiontoken,
          },
        })
            .then(({ statusCode, body }) => {
              if(statusCode < 300) {
                const products = (<Partial<CartEntity>[]>body).reduce(
                  (memo, product: Partial<CartEntity>) => {
                    memo += `${product.idName} - ${product.size}, `;
                    return memo;
                  },
                  ''
                );

                return { products };
              } else if (statusCode < 500) {
                throw new BadRequestException();
              } else {
                throw new InternalServerErrorException();
              }
            });

      case PartOption.GetProductsInCart:
        return this.forwardGot.get('api/cart/products-in-cart', {
          throwHttpErrors: false,
          responseType: 'json',
          headers: {
            'session-token': req.query.sessiontoken,
          },
        })
            .then(({ statusCode, body }) => {
              if(statusCode < 300) {
                const products = (<Partial<CartEntity>[]>body).reduce(
                  (memo, product: Partial<CartEntity>, index) => {
                    memo[index] = {
                      id: product.id,
                      idname: product.idName,
                      size: product.size,
                      session_token: product.sessionToken,
                      amount: product.amount.toString(),
                      paid: product.paid.toString(),
                    };
                    return memo;
                  },
                  {}
                );

                return { products };
              } else if (statusCode < 500) {
                throw new BadRequestException();
              } else {
                throw new InternalServerErrorException();
              }
            });

      case PartOption.GetProductsNumberInCart:
        return this.forwardGot.get('api/cart/products-in-cart', {
          throwHttpErrors: false,
          responseType: 'json',
          headers: {
            'session-token': req.query.sessiontoken,
          },
        })
            .then(({ statusCode, body }) => {
              if(statusCode < 300) {
                return { nr: (<CartEntity[]>body).length.toString() }
              } else if (statusCode < 500) {
                throw new BadRequestException();
              } else {
                throw new InternalServerErrorException();
              }
            });

      case PartOption.SetProductPaid:
        return this.forwardGot.post('api/cart/products-paid', {
          throwHttpErrors: false,
          headers: {
            'session-token': req.query.sessiontoken,
          },
        })
            .then(({ statusCode }) => {
              if(statusCode < 300) return { success: '1' };
              if(statusCode < 500) throw new BadRequestException();
            });

      case PartOption.Availability:
        return this.forwardGot.get('api/cart/availability', {
          throwHttpErrors: false,
          isStream: true,
          searchParams: {
            idName: req.query.idname,
            size: req.query.size === 'one_size' ? 'oneSize' : req.query.size,
          },
        });

      case PartOption.AvailabilityExact:
        return this.forwardGot.get('api/cart/more-accurate-availability', {
          throwHttpErrors: false,
          isStream: true,
          headers: {
            'session-token': req.query.sessiontoken,
          },
          searchParams: {
            idName: req.query.idname,
            size: req.query.size === 'one_size' ? 'oneSize' : req.query.size,
          },
        });

      case PartOption.TotalCheckout:
        return this.forwardGot.get('api/cart/total', {
          throwHttpErrors: false,
          isStream: true,
          headers: {
            'session-token': req.query.sessiontoken,
            'coupon': req.query.coupon,
          },
        });

      case PartOption.PurchasedEmail:
        return this.forwardGot.post('api/email', {
          throwHttpErrors: false,
          json: {
            price: req.query.price,
            customerEmail: req.query.email,
            firstName: req.query.firstname,
            lastName: req.query.lastname,
            birthday: req.query.birthday,
            mobile: req.query.mobile,
            address1: req.query.address1,
            address2: req.query.address2,
            city: req.query.city,
            state: req.query.state,
            zip: req.query.zip,
            country: req.query.country,
            comment: req.query.comment,
            products: req.query.products,
          } as PurchaseEmailDto,
        })
            .then(({ statusCode }) => {
              if(statusCode < 300) return;
              if(statusCode < 500) throw new BadRequestException();
            });

      default:
        throw new NotFoundException();
    }
  }
}
