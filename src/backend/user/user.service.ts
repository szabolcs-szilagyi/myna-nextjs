import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { DateTime } from 'luxon';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  async checkEmailExistInDatabase(email: string): Promise<boolean> {
    const user = await this.userRepository.findOne({ email }, { select: ['id'] });

    return user?.id !== undefined;
  }

  async createStubUser(email: string): Promise<void> {
    const now = DateTime
      .fromISO(new Date().toISOString(), { zone: 'Europe/London' })
      .toFormat('yyyy-MM-dd HH:mm:ss');

    await this.userRepository.insert({
      email,
      firstName: 'nodata',
      lastName: 'nodata',
      lastLogin: now,
      birthday: '1901-01-01',
    });
  }

  async updateLastLogin(email: string): Promise<void> {
    const now = DateTime
      .fromISO(new Date().toISOString(), { zone: 'Europe/London' })
      .toFormat('yyyy-MM-dd HH:mm:ss');

    await this.userRepository.update({ email }, { lastLogin: now });
  }
}