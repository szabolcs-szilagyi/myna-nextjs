import { Body, Controller, Inject, Post } from '@nestjs/common';
import { EmailStripperPipe } from './pipes/email-stripper.pipe';
import { TokenService } from './token.service';

@Controller('token')
export class TokenController {
  constructor(
    @Inject(TokenService)
    private readonly tokenService: TokenService
  ) {}

  @Post('mail-login')
  async mailLogin(@Body('email', EmailStripperPipe) email: string): Promise<object> {
    const safeEmail = email.substr(0, 127);

    const loginToken = await this.tokenService.getLoginToken(safeEmail);

    return {
      logintoken: loginToken,
      email: safeEmail,
    }
  }
}
