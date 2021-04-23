import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailController } from './email.controller';
import { ConfigModule } from '@nestjs/config';
import nestJSConfig from '../config/next-js.config';

@Module({
  imports: [
    ConfigModule.forFeature(nestJSConfig),
  ],
  providers: [EmailService],
  exports: [EmailService],
  controllers: [EmailController],
})
export class EmailModule {}
