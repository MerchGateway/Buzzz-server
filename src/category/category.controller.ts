import {
  Body,
  Controller,
  Param,
  Post,
  Put,
  Get,
  Delete,
  ParseUUIDPipe,
  Res,
} from '@nestjs/common';
import { SuccessResponseDto } from './common/success/dto/success.dto';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/category.dto';
import { CategoryService } from './category.service';
import { Response } from 'express';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  @Post('create')
  private async createCategory(
    @Body() payload: CreateCategoryDto,
    @Res() response: Response,
  ): Promise<Response<SuccessResponseDto> | undefined> {
    console.log(payload instanceof CreateCategoryDto);
    return await this.categoryService.createCategory(payload, response);
  }
  @Put('update/:categoryId')
  private async updateCategory(
    @Body() body: UpdateCategoryDto,
    @Res() response: Response,
    @Param('categoryId', ParseUUIDPipe) categoryId: string,
  ): Promise<Response<SuccessResponseDto> | undefined> {
    console.log(body);
    return this.categoryService.updateCategory(body, categoryId, response);
  }
  @Get('/:categoryId')
  private async getCategory(
    @Param('categoryId', ParseUUIDPipe) categoryId: string,
    @Res() response: Response,
  ): Promise<Response<SuccessResponseDto> | undefined> {
    return await this.categoryService.getCategory(categoryId, response);
  }
  @Delete('delete/:categoryId')
  private async deleteCategory(
    @Param('categoryId', ParseUUIDPipe) categoryId: string,
    @Res() response: Response,
  ): Promise<Response<SuccessResponseDto> | undefined> {
    return await this.categoryService.deleteCategory(categoryId, response);
  }
  @Get()
  private async getCategories(
    @Res() response: Response,
  ): Promise<Response<SuccessResponseDto> | undefined> {
    return await this.categoryService.getCategories(response);
  }
}
