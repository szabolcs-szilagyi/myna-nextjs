import { Injectable } from '@nestjs/common';
import {
  SESv2Client,
  SendEmailCommand
} from '@aws-sdk/client-sesv2';

@Injectable()
export class EmailService {
  private readonly client: SESv2Client;

  constructor() {
    this.client = new SESv2Client({
      region: 'eu-west-3',
      credentials: {
        accessKeyId: process.env.ACCESS_KEY_ID,
        secretAccessKey: process.env.SECRET_ACCESS_KEY,
      },
    });
  }

  async sendATestEmail() {
    const command = new SendEmailCommand({
      FromEmailAddress: 'szabolcs.szilagyi@gmx.com',
      Destination: { ToAddresses: ['szabolcs.szilagyi@gmx.com'] },
      Content: { Simple: {
        Subject: {Data: 'test', Charset: 'UTF-8',},
        Body: { Html: {Data: '<h1>test</h1>', Charset: 'UTF-8',} },
      } },
    });
    console.log('sending.........')

    await this.client.send(command);
  }
}
