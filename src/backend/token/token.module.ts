import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoginTokenRepository } from './login-token.repository';
import { SessionTokenRepository } from './session-token.repository';
import { TokenController } from './token.controller';
import { TokenService } from './token.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SessionTokenRepository,
      LoginTokenRepository,
    ]),
  ],
  controllers: [TokenController],
  providers: [TokenService]
})
export class TokenModule {}
