import { Injectable, HttpException, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/category.dto';

import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
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
        throw new NotFoundException('Category does not exist');
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
        throw new NotFoundException('Category not found');
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
        throw new NotFoundException('Category not found');
      }
      return categories;
    } catch (err: any) {
      throw new HttpException(err.message, err.status);
    }
  }

  public async deleteCategory(categoryId: string): Promise<any | undefined> {
    try {
      // check if category exists
      const isCategory = await Category.findOne({ where: { id: categoryId } });
      if (!isCategory) {
        throw new NotFoundException('Category not found');
      }
      return await Category.delete(categoryId);
    } catch (err: any) {
      throw new HttpException(err.message, err.status);
    }
  }
}
