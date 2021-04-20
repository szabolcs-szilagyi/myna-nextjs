import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ConnectionManager, getConnectionManager } from 'typeorm';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  async createTypeOrmOptions(): Promise<TypeOrmModuleOptions> {
    const connectionManager: ConnectionManager = getConnectionManager();
    let options: any;

    if (connectionManager.has('default')) {
      options = connectionManager.get('default').options;
      await connectionManager.get('default').close();
    } else {
      options = {
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'myca_xdb',
        password: 'ud8UuUIpLJdS9Q!R',
        database: 'myca_xdb',
        keepConnectionAlive: true,
        autoLoadEntities: true,
        synchronize: false,
      };
    }

    return options;
  }
}
