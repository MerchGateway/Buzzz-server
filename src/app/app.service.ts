import { Injectable } from '@nestjs/common';
import { CategoryService } from './category/category.service';

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
