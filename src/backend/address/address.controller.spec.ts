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
import { Address } from './entities/address.entity';

describe('AddressController', () => {
  let app: INestApplication;
  let sessionRepo: SessionTokenRepository;
  let addressRepo: AddressRepository;

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
    sessionRepo = app.get(SessionTokenRepository) as SessionTokenRepository;
    addressRepo = app.get(AddressRepository) as AddressRepository;
  });

  beforeEach(async () => {
    await sessionRepo.delete({});
    await addressRepo.delete({});
  })

  afterAll(async () => app.close());

  describe('GET shipping-info', () => {
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
  });

  describe('GET address-data', () => {
    it('should return default empty data', async () => {
      return agent(app.getHttpServer())
        .get('/address/address-data')
        .expect(200, {});
    });

    it('should return correct address data connected to session and email', async () => {
      const sessionToken = 'aaasdfasdfasdf';
      const email = 'heldxo@lldf.kl';

      const addressData: Address = {
        addressLine1: 'line 1',
        addressLine2: 'line 2',
        city: 'good city',
        comment: '1',
        country: 'loli',
        email,
        mobile: '2342343243',
        name: 'helel lelel',
        sessionToken,
        type: 1,
        state: '',
        zip: '3242-23',
      }

      await sessionRepo.insert({ email, sessionToken, createTime: new Date() });
      await addressRepo.insert(addressData);

      return agent(app.getHttpServer())
        .set('session-token', sessionToken)
        .set('email', email)
        .get('/address/address-data')
        .expect(200, {
          type: 1,
          addressLine1: addressData.addressLine1,
          addressLine2: addressData.addressLine2,
          city: addressData.city,
          state: addressData.state,
          zip: addressData.zip,
          country: addressData.country,
          comment: addressData.comment,
          mobile: addressData.mobile,
        });
    });
  });
});
