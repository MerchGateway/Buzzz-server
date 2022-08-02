import { Injectable } from '@nestjs/common';
import {
  createCategoryDto,
  updateCategoryDto,
  getCategoriesDto,
  getCategoryDto,
  updateCategoryResponseDto,
  createCategoryResponseDto,
  deleteCategoryResponseDto,
} from '../dto/category.dto';
@Injectable()
export class CategoryService {
  // eslint-disable-next-line prettier/prettier
       createCategory(payload: createCategoryDto): createCategoryResponseDto {
    console.log(payload);
    return {};
  }
  updateCategory(
    payload: updateCategoryDto,
    categoryId: string,
  ): updateCategoryResponseDto {
    console.log(payload, categoryId);
    return {};
  }
  getCategory(categoryId: string): getCategoryDto {
    console.log(categoryId);
    return {};
  }
  getCategories(): getCategoriesDto {
    return {};
  }
  deleteCategory(categoryId: string): deleteCategoryResponseDto {
    console.log(categoryId);
    return {};
  }
}
