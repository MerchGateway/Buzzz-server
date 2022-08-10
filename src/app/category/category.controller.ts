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
  private async createCategory(
    @Body() payload: CreateCategoryDto,
  ): Promise<Category | undefined> {
    return await this.categoryService.createCategory(payload);
  }

  @Put('update/:categoryId')
  private async updateCategory(
    @Body() body: UpdateCategoryDto,
    @Param('categoryId', ParseUUIDPipe) categoryId: string,
  ): Promise<Category | undefined> {
    return await this.categoryService.updateCategory(body, categoryId);
  }

  @Get('/:categoryId')
  private async getCategory(
    @Param('categoryId', ParseUUIDPipe) categoryId: string,
  ): Promise<Category | undefined> {
    return await this.categoryService.getCategory(categoryId);
  }

  @Delete('/delete/:categoryId')
  private async deleteCategory(
    @Param('categoryId', ParseUUIDPipe) categoryId: string,
  ): Promise<Category | undefined> {
    return await this.categoryService.deleteCategory(categoryId);
  }

  @Get()
  private async getCategories(): Promise<Category[] | undefined> {
    return await this.categoryService.getCategories();
  }
}
