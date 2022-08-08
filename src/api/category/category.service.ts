import { Injectable, HttpException } from '@nestjs/common';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/category.dto';
import { Category } from '../../entities/category.entity';
import successResponse from 'src/api/category/common/success/success.response';
import { uuid } from 'uuidv4';
import { Response } from 'express';
import { SuccessResponseDto } from './common/success/dto/success.dto';

@Injectable()
export class CategoryService {
  // eslint-disable-next-line prettier/prettier

  public async createCategory(
    payload: CreateCategoryDto,
    response: Response,
  ): Promise<Response<SuccessResponseDto> | undefined> {
    try {
      const category = Category.create({
        id: uuid(),
        name: payload.name,
        description: payload.description,
      });
      await category.save();
      // fetch fresh copy of the just created category
      const cleanCategory = await Category.findOne({
        where: { id: category.id },
      });
      return successResponse(
        response,
        cleanCategory,
        201,
        'Category created successfully',
      );
    } catch (err: any) {
      throw new HttpException(err.message, err.status);
    }
  }
  public async updateCategory(
    payload: UpdateCategoryDto,
    categoryId: string,
    response: Response,
  ): Promise<Response<SuccessResponseDto> | undefined> {
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
        throw new HttpException('Category does not exist', 404);
      }

      return successResponse(
        response,
        updatedCategory,
        200,
        'Category updated successfully',
      );
    } catch (err: any) {
      console.log(err);
      throw new HttpException(err.message, err.status);
    }
  }
  public async getCategory(
    categoryId: string,
    response: Response,
  ): Promise<Response<SuccessResponseDto> | undefined> {
    console.log(categoryId);

    try {
      const category = await Category.findOne({ where: { id: categoryId } });
      console.log(category);
      if (!category) {
        throw new HttpException('Category does not exist or deleted', 404);
      }
      return successResponse(
        response,
        category,
        200,
        'Category fetched successfully',
      );
    } catch (err: any) {
      throw new HttpException(err.message, err.status);
    }
  }
  public async getCategories(
    response: Response,
  ): Promise<Response<SuccessResponseDto> | undefined> {
    try {
      const categories = await Category.find();

      if (!categories) {
        throw new HttpException('Category does not exist or deleted', 404);
      }
      return successResponse(
        response,
        categories,
        200,
        'Categories fetched successfully',
      );
    } catch (err: any) {
      throw new HttpException(err.message, err.status);
    }
  }
  public async deleteCategory(
    categoryId: string,
    response: Response,
  ): Promise<Response<SuccessResponseDto> | undefined> {
    try {
      // check if category exists
      const isCategory = await Category.findOne({ where: { id: categoryId } });

      if (!isCategory) {
        throw new HttpException('Category does not exist', 404);
      }
      await Category.delete(categoryId);
      return successResponse(
        response,
        { id: categoryId },
        200,
        'Category deleted successfully',
      );
    } catch (err: any) {
      throw new HttpException(err.message, err.status);
    }
  }
}
