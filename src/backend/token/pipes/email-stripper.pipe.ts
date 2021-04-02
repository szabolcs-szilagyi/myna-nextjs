import { Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class EmailStripperPipe implements PipeTransform {
  transform(value: string) {
    return value.toLowerCase().replace('/[^a-z0-9_@.-]+/', '');
  }
}
