import { Controller, Get, Inject, NotFoundException, Param, ParseIntPipe, Query, Req, ValidationPipe } from '@nestjs/common';
import { Request } from 'express';
import got from 'got';
import { Product } from './entities/product.entity';
import { ProductService } from './product.service';
import { ProductFilterDto } from './dto/product-filter.dto';

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

  @Get('legacy')
  findAll(
    @Req() req: Request,
    @Query('part') part: PartOption,
  ) {
    switch (part) {
      case PartOption.GetProductData:
        return got.get('http://localhost:3000/api/product', {
          isStream: true,
          searchParams: { idName: req.query.productname },
        })
      default:
        throw new NotFoundException();
    }
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Product> {
    return this.productService.findOne(id);
  }
}
