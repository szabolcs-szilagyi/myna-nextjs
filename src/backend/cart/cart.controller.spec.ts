import { agent } from 'supertest';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { CartController } from './cart.controller';
import { CartRepository } from './cart.repository';
import { CartService } from './cart.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { assert, match } from 'sinon';

describe('CartController', () => {
  let app: INestApplication;
  let cartRepo: CartRepository;

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
        ]),
      ],
      controllers: [CartController],
      providers: [CartService],
    })
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();

    cartRepo = app.get(CartRepository) as CartRepository;
  })

  afterAll(() => app.close());

  beforeEach(async () => {
    await cartRepo.delete({});
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

  describe('GET products-to-mail', () => {
    it('requires session-token', () => {
      return agent(app.getHttpServer())
        .get('/cart/products-to-mail')
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

      await cartRepo.update({ sessionToken, idName: 'second' }, { paid: true });

      await agent(app.getHttpServer())
        .get('/cart/products-to-mail')
        .set('session-token', sessionToken)
        .expect(200, [{ idName: 'first', size: 'L' }]);
    });
  });
});
