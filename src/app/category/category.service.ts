import { Injectable, HttpException, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}
  // TODO: just return what was created instead of fetching it again after being created
  public async createCategory(
    payload: CreateCategoryDto,
  ): Promise<Category | undefined> {
    try {
      const category = this.categoryRepository.create({
        name: payload.name,
        description: payload.description,
      });
      await this.categoryRepository.save(category);
      // fetch fresh copy of the just created category
      const cleanCategory = await this.categoryRepository.findOne({
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
      await this.categoryRepository
        .createQueryBuilder()
        .update()
        .set({ name: payload.name, description: payload.description })
        .where('id= :id', { id: categoryId })
        .execute();
      // fetch updated category
      const updatedCategory = await this.categoryRepository.findOne({
        where: { id: categoryId },
      });
      if (!updatedCategory) {
        throw new NotFoundException(
          `Category with id ${categoryId} does not exist`,
        );
      }

      return updatedCategory;
    } catch (err: any) {
      throw new HttpException(err.message, err.status);
    }
  }

  public async getCategory(categoryId: string): Promise<Category | undefined> {
    try {
      const category = await this.categoryRepository.findOne({
        where: { id: categoryId },
        relations: { products: true },
      });
      if (!category) {
        throw new NotFoundException(
          `Category with id ${categoryId} does not exist`,
        );
      }
      return category;
    } catch (err: any) {
      throw new HttpException(err.message, err.status);
    }
  }

  public async getCategories(): Promise<Category[] | undefined> {
    try {
      const categories = await this.categoryRepository.find({
        relations: { products: true },
      });
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
      const isCategory = await this.categoryRepository.findOne({
        where: { id: categoryId },
      });
      if (!isCategory) {
        throw new NotFoundException(
          `Category with id ${categoryId} does not exist`,
        );
      }
      await this.categoryRepository.delete(categoryId);
      return isCategory;
    } catch (err: any) {
      throw new HttpException(err.message, err.status);
    }
  }
}
