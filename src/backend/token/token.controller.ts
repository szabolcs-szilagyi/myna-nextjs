import { Body, Controller, Inject, Post } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { PurifiedToken } from './decorators/purified-token.decorator';
import { EmailStripperPipe } from './pipes/email-stripper.pipe';
import { TokenService } from './token.service';

@Controller('token')
export class TokenController {
  constructor(
    @Inject(TokenService)
    private readonly tokenService: TokenService,
    @Inject(UserService)
    private readonly userService: UserService,
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

  @Post('login')
  async login(
    @Body('email', EmailStripperPipe) email: string,
    @PurifiedToken('login-token') loginToken: string,
    @PurifiedToken('session-token') sessionToken: string,
  ) {
    const isAuthorized = await this.tokenService.authorizeLogin(email, loginToken);
    const isSessionGood = await this.tokenService.validateSessionToken(sessionToken);
    let successful = '0';

    if(isAuthorized && isSessionGood) {
      const emailExist = await this.userService.checkEmailExistInDatabase(email);
      if(!emailExist) {
		    await this.userService.createStubUser(email);
      }
		  await this.tokenService.setEmailToSession(email, sessionToken);
      await this.userService.updateLastLogin(email);
      successful = '1';
    } else {
		  sessionToken = await this.tokenService.setSessionToken();
      successful = '0';
    }

    return {
      login_successful: successful,
      email,
      sessiontoken: sessionToken,
    }
  }
}
