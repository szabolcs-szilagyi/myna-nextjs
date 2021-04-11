import { BadRequestException, Body, Controller, Get, Inject, NotFoundException, Post, Query } from '@nestjs/common';
import { EmailStripperPipe } from '../token/pipes/email-stripper.pipe';
import { NewsletterService } from './newsletter.service';

@Controller('newsletter')
export class NewsletterController {
  constructor(
    @Inject(NewsletterService)
    private readonly newsletterService: NewsletterService
  ) {}

  @Post('subscribe')
  async subscribe(
    @Body('email', EmailStripperPipe) email: string,
  ) {
    if(!email) throw new BadRequestException();
    const subscriptionToken: string = await this.newsletterService.subscribe(email)

    if(subscriptionToken) {
      return { success: '1', token: subscriptionToken };
    } else {
      return { success: '0', token: undefined };
    }
  }

  @Get('confirm')
  async confirm(
    @Query('token') token: string,
  ) {
    if(!token) throw new BadRequestException()
    const numberAffected = await this.newsletterService.confirm(token);

    if(numberAffected < 1) throw new NotFoundException();
  }
}
