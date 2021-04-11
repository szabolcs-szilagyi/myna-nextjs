import { Module } from '@nestjs/common';
import { NewsletterService } from './newsletter.service';
import { NewsletterController } from './newsletter.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewsletterRepository } from './newsletter.repository';

@Module({
  imports: [TypeOrmModule.forFeature([NewsletterRepository])],
  controllers: [NewsletterController],
  providers: [NewsletterService]
})
export class NewsletterModule {}
