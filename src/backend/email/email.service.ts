import { Injectable } from '@nestjs/common';
import {
  SESv2Client,
  SendEmailCommand
} from '@aws-sdk/client-sesv2';
import { PurchaseEmailDto } from './dto/purchase-email.dto';

type PreparedEmail = {
  to: string,
  subject: string,
  textBody: string,
  htmlBody: string,
};

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

  private async sendEmail(preparedEmail: PreparedEmail): Promise<void> {
    const command = new SendEmailCommand({
      FromEmailAddress: 'M Y N A <szabolcs.szilagyi@gmx.com>',
      Destination: {
        ToAddresses: ['szabolcs.szilagyi@gmx.com'],
        // BccAddresses: ['connect@mynalabel.com'],
      },
      Content: {
        Simple: {
          Subject: { Data: preparedEmail.subject, Charset: 'UTF-8', },
          Body: {
            Html: { Data: preparedEmail.htmlBody, Charset: 'UTF-8' },
            Text: { Data: preparedEmail.textBody, Charset: 'UTF-8' },
          },
        },
      },
    });

    await this.client.send(command);
  }

  async sendPurchaseEmail(purchaseEmailDto: PurchaseEmailDto) {
    const subject = 'New Order';
    const { textBody, htmlBody } = Object
      .entries(purchaseEmailDto)
      .reduce((memo, [key, value]) => {
        memo.textBody += `${key}: ${value}\r\n\r\n`;
        memo.htmlBody += `${key}: ${value}<br />`;
        return memo;
      }, { textBody: '', htmlBody: '' });

    const preparedEmail = {
      to: purchaseEmailDto.customerEmail,
      subject,
      textBody,
      htmlBody,
    } as PreparedEmail;

    await this.sendEmail(preparedEmail);
  }
}
