import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/category.dto';

import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  // eslint-disable-next-line prettier/prettier

  public async createCategory(
    payload: CreateCategoryDto,
  ): Promise<Category | undefined> {
    try {
      const category = Category.create({
        name: payload.name,
        description: payload.description,
      });
      await Category.save(category);
      // fetch fresh copy of the just created category
      const cleanCategory = await Category.findOne({
        where: { id: category.id },
      });
      return cleanCategory;
    } catch (err: any) {
      throw new HttpException(err.message, err.status);
    }
  }
  public async updateCategory(
    payload: UpdateCategoryDto,
    categoryId: string,
  ): Promise<Category | undefined> {
    try {
      console.log(payload);
      await Category.createQueryBuilder()
        .update()
        .set({ name: payload.name, description: payload.description })
        .where('id= :id', { id: categoryId })
        .execute();
      // fetch updated category
      const updatedCategory = await Category.findOne({
        where: { id: categoryId },
      });
      if (!updatedCategory) {
        throw new HttpException(
          'Category does not exist',
          HttpStatus.NOT_FOUND,
        );
      }

      return updatedCategory;
    } catch (err: any) {
      console.log(err);
      throw new HttpException(err.message, err.status);
    }
  }
  public async getCategory(categoryId: string): Promise<Category | undefined> {
    console.log(categoryId);

    try {
      const category = await Category.findOne({ where: { id: categoryId } });
      console.log(category);
      if (!category) {
        throw new HttpException(
          'Category does not exist or deleted',
          HttpStatus.NOT_FOUND,
        );
      }
      return category;
    } catch (err: any) {
      throw new HttpException(err.message, err.status);
    }
  }
  public async getCategories(): Promise<Category[] | undefined> {
    try {
      const categories = await Category.find();

      if (!categories) {
        throw new HttpException(
          'Category(s) does not exist or deleted',
          HttpStatus.NOT_FOUND,
        );
      }
      return categories;
    } catch (err: any) {
      throw new HttpException(err.message, err.status);
    }
  }
  public async deleteCategory(
    categoryId: string,
  ): Promise<Category | undefined> {
    try {
      // check if category exists
      const isCategory = await Category.findOne({ where: { id: categoryId } });

      if (!isCategory) {
        throw new HttpException('Category does not exist', 404);
      }
      await Category.delete(categoryId);
      return;
    } catch (err: any) {
      throw new HttpException(err.message, err.status);
    }
  }
}
