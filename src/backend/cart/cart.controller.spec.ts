import { agent } from 'supertest';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { CartController } from './cart.controller';
import { CartRepository } from './cart.repository';
import { CartService } from './cart.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { assert, match, createSandbox } from 'sinon';
import { StockRepository } from './stock.repository';
import { PurchasedRepository } from './purchased.repository';
import { TokenService } from '../token/token.service';
import { TokenModule } from '../token/token.module';

const sandbox = createSandbox();

describe('CartController', () => {
  let app: INestApplication;
  let cartRepo: CartRepository;
  let stockRepo: StockRepository;
  let purchasedRepo: PurchasedRepository;

  const tokenService = {
    getEmailBySessionToken: sandbox.stub(),
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'mysql',
          host: 'localhost',
          port: 3306,
          username: 'myna_test',
          password: 'test',
          database: 'myna_test',
          autoLoadEntities: true,
          synchronize: false,
        }),
        TypeOrmModule.forFeature([
          CartRepository,
          StockRepository,
          PurchasedRepository,
        ]),
        TokenModule,
      ],
      controllers: [CartController],
      providers: [CartService],
    })
      .overrideProvider(TokenService)
      .useValue(tokenService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();

    cartRepo = app.get(CartRepository) as CartRepository;
    stockRepo = app.get(StockRepository) as StockRepository;
    purchasedRepo = app.get(PurchasedRepository) as PurchasedRepository;
  });

  afterAll(() => app.close());

  beforeEach(async () => {
    await cartRepo.delete({});
    await stockRepo.delete({});
    await purchasedRepo.delete({});

    sandbox.reset();
    tokenService.getEmailBySessionToken.callsFake(async () => 'slkdjfslkdjfls');
  });

  describe('POST cart', () => {
    it('requires session and product details', () => {
      return agent(app.getHttpServer())
        .post('/cart')
        .expect(400);
    })

    it('able to add product', async () => {
      const sessionToken = 'randomletters1324324';
      await agent(app.getHttpServer())
        .post('/cart')
        .set('session-token', sessionToken)
        .send(<AddToCartDto>{
          idName: 'something',
          size: 'XXL',
        })
        .expect(201, { success: '1' });

      const cartItemRecord = await cartRepo.find({ sessionToken });

      assert.match(cartItemRecord[0], { paid: match.falsy, sessionToken })
    })
  });

  describe('DELETE cart/:id', () => {
    it('requires session and product id', () => {
      return agent(app.getHttpServer())
        .delete('/cart/0')
        .expect(400);
    })

    it('able to remove product from cart', async () => {
      const sessionToken = 'randomles1324324';
      await agent(app.getHttpServer())
        .post('/cart')
        .set('session-token', sessionToken)
        .send(<AddToCartDto>{
          idName: 'sotest',
          size: 'XL',
        })
        .expect(201, { success: '1' });

      const cartItemRecord = await cartRepo.findOne({ sessionToken });

      await agent(app.getHttpServer())
        .delete('/cart/' + cartItemRecord.id)
        .set('session-token', sessionToken)
        .expect(200, { success: '1' });
    });
  });

  describe('GET products-in-cart', () => {
    it('requires session-token', () => {
      return agent(app.getHttpServer())
        .get('/cart/products-in-cart')
        .expect(400);
    });

    it('returns the correct products', async () => {
      const sessionToken = 'rromelslsdkfe';
      await agent(app.getHttpServer())
        .post('/cart')
        .set('session-token', sessionToken)
        .send(<AddToCartDto>{
          idName: 'first',
          size: 'L',
        })
        .expect(201, { success: '1' });

      await agent(app.getHttpServer())
        .post('/cart')
        .set('session-token', sessionToken)
        .send(<AddToCartDto>{
          idName: 'second',
          size: 'L',
        })
        .expect(201, { success: '1' });

      await cartRepo.update({ sessionToken, idName: 'second' }, { paid: 1 });

      await agent(app.getHttpServer())
        .get('/cart/products-in-cart')
        .set('session-token', sessionToken)
        .expect(200)
        .then(({ body }) => {
          assert.match(body[0], { idName: 'first', size: 'L' })
        });
    });
  });

  describe('POST products-paid', () => {
    it('requires session-token', () => {
      return agent(app.getHttpServer())
        .get('/cart/products-in-cart')
        .expect(400);
    });

    it('reduces stock levels', async () => {
      const sessionToken = 'fdsafdsafdsa';
      await agent(app.getHttpServer())
        .post('/cart')
        .set('session-token', sessionToken)
        .send(<AddToCartDto>{ idName: 'first1', size: 's' })
        .expect(201, { success: '1' });

      await stockRepo.insert({ idName: 'first1', s: 5, m: 5 });
      await stockRepo.insert({ idName: 'second2', s: 5, m: 2 });

      await agent(app.getHttpServer())
        .post('/cart/products-paid')
        .set('session-token', sessionToken)
        .expect(201);

      const stockLevels = await stockRepo.find({ order: { id: 'ASC' } });

      assert.match(stockLevels, [
        match({ idName: 'first1', s: 4, m: 5 }),
        match({ idName: 'second2', s: 5, m: 2 }),
      ]);
    });

    it('set cart items that they have been paid', async () => {
      const sessionToken = 'fdsafdsalkjlkj';
      await agent(app.getHttpServer())
        .post('/cart')
        .set('session-token', sessionToken)
        .send(<AddToCartDto>{ idName: 'first2', size: 's' })
        .expect(201, { success: '1' });

      await stockRepo.insert({ idName: 'first2', s: 5, m: 5 });

      await agent(app.getHttpServer())
        .post('/cart/products-paid')
        .set('session-token', sessionToken)
        .expect(201);

      const cartContent = await cartRepo.getProductsInCart(sessionToken);
      const rawCartContent = await cartRepo.find({
        where: { sessionToken },
        order: { id: 'ASC' },
      });

      expect(cartContent.length).toEqual(0);
      assert.match(rawCartContent, [
        match({ sessionToken, paid: 1, idName: 'first2' }),
      ]);
    });

    it('records the transaction in the purchased repo', async () => {
      const sessionToken = 'fdsafeeeeeelkj';
      await agent(app.getHttpServer())
        .post('/cart')
        .set('session-token', sessionToken)
        .send(<AddToCartDto>{ idName: 'first3', size: 'm' })
        .expect(201, { success: '1' });

      await stockRepo.insert({ idName: 'first3', s: 5, m: 5 });

      await agent(app.getHttpServer())
        .post('/cart/products-paid')
        .set('session-token', sessionToken)
        .expect(201);

      const purchaseRecords = await purchasedRepo.find({ sessionToken });

      assert.calledOnce(tokenService.getEmailBySessionToken);
      expect(purchaseRecords.length).toEqual(1)
    });
  });

  describe('GET availability', () => {
    it('needs product idName', () => {
      return agent(app.getHttpServer())
        .get('/cart/availability')
        .query({ size: 'l' })
        .expect(400);
    });

    it('also needs size', () => {
      return agent(app.getHttpServer())
        .get('/cart/availability')
        .query({ idName: 'test-product' })
        .expect(400);
    });

    it('returns not found if asking for non-existent combo', () => {
      return agent(app.getHttpServer())
        .get('/cart/availability')
        .query({ idName: 'test-product', size: 'l' })
        .expect(404);
    });

    it('return the amount from the database', async () => {
      await stockRepo.insert({
        idName: 'exist',
        xs: 1,
        s: 2,
        m: 3,
        ml: 4,
        l: 5,
        oneSize: null,
      });

      return agent(app.getHttpServer())
        .get('/cart/availability')
        .query({ idName: 'exist', size: 'l' })
        .expect(200, { availability: 5 });
    });
  });

  describe('GET more-accurate-availability', () => {
    it('gives un-altered number if nothing in cart', async () => {
      await stockRepo.insert({
        idName: 'exist',
        xs: 1,
        s: 2,
        m: 3,
        ml: 4,
        l: 5,
        oneSize: null,
      });

      return agent(app.getHttpServer())
        .get('/cart/more-accurate-availability')
        .query({ idName: 'exist', size: 'l' })
        .expect(200, { availability: 5 });
    });

    it('reduces availability with the number of products in cart', async () => {
      const sessionToken = '12312312434233e';
      await stockRepo.insert({
        idName: 'exist',
        xs: 1,
        s: 2,
        m: 3,
        ml: 4,
        l: 5,
        oneSize: 66,
      });
      await cartRepo.insert({
        amount: 2,
        idName: 'exist',
        size: 'onesize',
        paid: 0,
        sessionToken,
      });

      return agent(app.getHttpServer())
        .get('/cart/more-accurate-availability')
        .set('session-token', sessionToken)
        .query({ idName: 'exist', size: 'oneSize' })
        .expect(200, { availability: 64 });
    });

    it('will not reduce availability if different session is given', async () => {
      await stockRepo.insert({
        idName: 'exist',
        xs: 1,
        s: 2,
        m: 3,
        ml: 4,
        l: 5,
        oneSize: 66,
      });
      await cartRepo.insert({
        amount: 2,
        idName: 'exist',
        size: 'onesize',
        paid: 0,
        sessionToken: '12312312434233e',
      });

      return agent(app.getHttpServer())
        .get('/cart/more-accurate-availability')
        .set('session-token', 'somethingelse')
        .query({ idName: 'exist', size: 'oneSize' })
        .expect(200, { availability: 66 });
    });
  });
});
