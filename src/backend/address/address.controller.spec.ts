import { agent } from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenService } from '../token/token.service';
import { AddressService } from '../address/address.service';
import { AddressController } from '../address/address.controller';
import { AddressRepository } from './address.repository';
import { LoginTokenRepository } from '../token/login-token.repository';
import { SessionTokenRepository } from '../token/session-token.repository';

describe('AddressController', () => {
  let app: INestApplication;

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
          AddressRepository,
          LoginTokenRepository,
          SessionTokenRepository,
        ])
      ],
      controllers: [AddressController],
      providers: [
        AddressService,
        TokenService,
      ],
    })
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('GET shipping-info', () => {
    let sessionRepo: SessionTokenRepository;
    let addressRepo: AddressRepository;

    beforeAll(() => {
      sessionRepo = app.get(SessionTokenRepository) as SessionTokenRepository;
      addressRepo = app.get(AddressRepository) as AddressRepository;
    });

    beforeEach(async () => {
      await sessionRepo.delete({});
      await addressRepo.delete({});
    })

    it('returns default text if no session available', async () => {
      return agent(app.getHttpServer())
        .get('/address/shipping-info')
        .expect(200, { shippinginfo: 'Plus shipping fee' })
    });

    it('for EU countries shipping is 10 EUR', async () => {
      const sessionToken = 'asdfasdfasdfasdfasdfasd';
      const email = 'test@e-mail.hu';

      await sessionRepo.insert({
        email,
        sessionToken,
        createTime: new Date(),
      })

      await addressRepo.insert({
        country: 'austria',
        type: 1,
        email,
        sessionToken,
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        zip: '',
        comment: '',
        mobile: '',
      })

      await agent(app.getHttpServer())
        .get('/address/shipping-info')
        .set('session-token', sessionToken)
        .expect(200, { shippinginfo: 'incl. €10 shipping fee (EU)' });
    })

    it('for non-EU countries shipping is 25 EUR', async () => {
      const sessionToken = 'asdfasdfasdfasdfasdfasd';
      const email = 'test@e-mail.hu';

      await sessionRepo.insert({
        email,
        sessionToken,
        createTime: new Date(),
      })

      await addressRepo.insert({
        country: 'australia',
        type: 1,
        email,
        sessionToken,
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        zip: '',
        comment: '',
        mobile: '',
      })

      await agent(app.getHttpServer())
        .get('/address/shipping-info')
        .set('session-token', sessionToken)
        .expect(200, { shippinginfo: 'incl. €25 shipping fee (Non-EU)' });
    })

    it('for Poland its free shipping', async () => {
      const sessionToken = 'asdfasdfasdfasdfasdfasd';
      const email = 'test@e-mail.hu';

      await sessionRepo.insert({
        email,
        sessionToken,
        createTime: new Date(),
      })

      await addressRepo.insert({
        country: 'poland',
        type: 1,
        email,
        sessionToken,
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        zip: '',
        comment: '',
        mobile: '',
      })

      await agent(app.getHttpServer())
        .get('/address/shipping-info')
        .set('session-token', sessionToken)
        .expect(200, { shippinginfo: 'incl. free shipping' });
    })
  })
});
