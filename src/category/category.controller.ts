import {
  Body,
  Controller,
  Param,
  Post,
  Put,
  Get,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';

import {
  createCategoryDto,
  updateCategoryDto,
  getCategoriesDto,
  getCategoryDto,
  updateCategoryResponseDto,
  createCategoryResponseDto,
  deleteCategoryResponseDto,
} from '../dto/category.dto';
import { CategoryService } from './category.service';
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  @Post('create')
  createCategory(@Body() body: createCategoryDto): createCategoryResponseDto {
    return this.categoryService.createCategory(body);
  }
  @Put('update/:categoryId')
  updateCategory(
    @Body() body: updateCategoryDto,
    @Param('categoryId', ParseUUIDPipe) categoryId: string,
  ): updateCategoryResponseDto {
    return this.categoryService.updateCategory(body, categoryId);
  }
  @Get('/:categoryId')
  getCategory(
    @Param('categoryId', ParseUUIDPipe) categoryId: string,
  ): getCategoryDto {
    return this.categoryService.getCategory(categoryId);
  }
  @Delete('delete/:categoryId')
  deleteCategory(
    @Param('categoryId', ParseUUIDPipe) categoryId: string,
  ): deleteCategoryResponseDto {
    return this.categoryService.deleteCategory(categoryId);
  }
  @Get()
  getCategories(): getCategoriesDto[] {
    return [];
  }
}
