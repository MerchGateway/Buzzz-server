import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): object {
    return {
      message: 'Welcome to buzzz api',
      serverTime: new Date(),
      version: '0.1.0',
    };
  }
}
