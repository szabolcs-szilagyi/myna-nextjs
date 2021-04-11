import { agent } from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { assert, match } from 'sinon';
import { omit } from 'lodash/fp';
import { NewsletterController } from './newsletter.controller';
import { NewsletterService } from './newsletter.service';
import { NewsletterRepository } from './newsletter.repository';

describe('NewsletterController', () => {
  let app: INestApplication;
  let newsletterRepo: NewsletterRepository;

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
          NewsletterRepository
        ])
      ],
      controllers: [NewsletterController],
      providers: [
        NewsletterService,
      ],
    })
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();

    newsletterRepo = app.get(NewsletterRepository) as NewsletterRepository;
  });

  beforeEach(async () => {
    await newsletterRepo.delete({});
  })

  afterAll(async () => app.close());

  describe('POST subscribe', () => {
    it('records news subscription', async () => {
      return agent(app.getHttpServer())
        .post('/newsletter/subscribe')
        .send({ email: 'hello@123.hu' })
        .expect(201)
        .then(({ body }) => assert.match(body, { success: '1', token: match.string }));
    });

    it('will not register the same e-mail again', async () => {
      await agent(app.getHttpServer())
        .post('/newsletter/subscribe')
        .send({ email: 'hello@123.hu' })
        .expect(201)
        .then(({ body }) => assert.match(body, { success: '1', token: match.string }));

      return agent(app.getHttpServer())
        .post('/newsletter/subscribe')
        .send({ email: 'hello@123.hu' })
        .expect(201)
        .then(({ body }) => assert.match(body, { success: '0' }));
    });
  });

  describe('GET confirm', () => {
    it('should be resistent', async () => {
      return agent(app.getHttpServer())
        .get('/newsletter/confirm')
        .expect(400);
    });

    it('should return OK if manages to activate', async () => {
      const token = await agent(app.getHttpServer())
        .post('/newsletter/subscribe')
        .send({ email: 'hello@123123123.hu' })
        .expect(201)
        .then(({ body }) => (body.token));

      return agent(app.getHttpServer())
        .get('/newsletter/confirm')
        .query({ token })
        .expect(200);
    });

    it('should return 404 if the provided token does not exist', async () => {
      return agent(app.getHttpServer())
        .get('/newsletter/confirm')
        .query({ token: 'no such thing' })
        .expect(404);
    })
  })
});
