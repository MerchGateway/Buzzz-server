import { Injectable } from '@nestjs/common';
import { CategoryService } from './category/category.service';

@Injectable()
export class AppService {
  constructor(private readonly categoryService: CategoryService) {}
  getHello(): string {

    return 'Hello World!';
  }
}
