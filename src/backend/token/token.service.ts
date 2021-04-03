import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createHash, randomInt } from 'crypto';
import { LoginTokenRepository } from './login-token.repository';

type MD5Hash = string;

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(LoginTokenRepository)
    private readonly loginTokenRepository: LoginTokenRepository,
  ) {}

  async getLoginToken(email: string): Promise<MD5Hash> {
    const now = new Date();
    const toHash = [email, now, randomInt(10000, 99999)].join('')
    const hash = createHash('md5').update(toHash).digest('hex');

    await this.loginTokenRepository.insert({
      email,
      loginToken: hash,
      createTime: now,
    })

    return hash;
  }
}