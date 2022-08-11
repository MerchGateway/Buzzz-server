import {
  Body,
  Controller,
  Param,
  Post,
  Put,
  Get,
  Delete,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';

import { CreateCategoryDto, UpdateCategoryDto } from './dto/category.dto';
import { CategoryService } from './category.service';
import { Category } from './entities/category.entity';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  private createCategory(
    @Body() payload: CreateCategoryDto,
  ): Promise<Category | undefined> {
    return this.categoryService.createCategory(payload);
  }

  @Put('update/:categoryId')
  private updateCategory(
    @Body() body: UpdateCategoryDto,
    @Param('categoryId', ParseUUIDPipe) categoryId: string,
  ): Promise<Category | undefined> {
    return this.categoryService.updateCategory(body, categoryId);
  }

  @Get('/:categoryId')
  private getCategory(
    @Param('categoryId', ParseUUIDPipe) categoryId: string,
  ): Promise<Category | undefined> {
    return this.categoryService.getCategory(categoryId);
  }

  @Delete('/delete/:categoryId')
  private deleteCategory(
    @Param('categoryId', ParseUUIDPipe) categoryId: string,
  ): Promise<Category | undefined> {
    return this.categoryService.deleteCategory(categoryId);
  }

  @Get()
  private getCategories(): Promise<Category[] | undefined> {
    return this.categoryService.getCategories();
  }
}
