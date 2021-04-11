import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { NewsletterEntity } from './entities/newsletter.entity';
import { NewsletterRepository } from './newsletter.repository';
import * as crypto from 'crypto';

@Injectable()
export class NewsletterService {
  constructor(
    @InjectRepository(NewsletterRepository)
    private readonly newsletterRepository: NewsletterRepository,
    @InjectConnection()
    private readonly connection: Connection,
  ) {}

  async subscribe(email: string): Promise<string> {
    const alreadySubscribed = await this.newsletterRepository.findOne({ email }, { select: ['id'] })

    if(alreadySubscribed) return '';

    let token = crypto.randomBytes(16).toString('hex');
    const queryRunner = this.connection.createQueryRunner()
    await queryRunner.connect();
    await queryRunner.startTransaction();

    await queryRunner.manager.insert(NewsletterEntity, {
      email,
      enabled: 1,
      subscribeDate: new Date(),
      token,
    })

    try {
      console.log('TODO: send e-mail about the subscription');
      await queryRunner.commitTransaction();
    } catch(e) {
      token = '';
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }

    return token;
  }
}
