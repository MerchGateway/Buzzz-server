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
  UseGuards,
} from '@nestjs/common';

import { Public } from 'src/decorators/public.decorator';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/types/general';

import { CreateCategoryDto, UpdateCategoryDto } from './dto/category.dto';
import { CategoryService } from './category.service';
import { Category } from './entities/category.entity';
import { RolesGuard } from '../auth/guards/roles.guard';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Roles(Role.ADMIN, Role.SUPER_ADMIN, Role.PUBLISHER)
  @UseGuards(RolesGuard)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  private createCategory(
    @Body() payload: CreateCategoryDto,
  ): Promise<Category | undefined> {
    return this.categoryService.createCategory(payload);
  }

  @Roles(Role.ADMIN, Role.SUPER_ADMIN, Role.PUBLISHER)
  @UseGuards(RolesGuard)
  @Put('/:categoryId')
  private updateCategory(
    @Body() body: UpdateCategoryDto,
    @Param('categoryId', ParseUUIDPipe) categoryId: string,
  ): Promise<Category | undefined> {
    return this.categoryService.updateCategory(body, categoryId);
  }

  @Public()
  @Get('/:categoryId')
  private getCategory(
    @Param('categoryId', ParseUUIDPipe) categoryId: string,
  ): Promise<Category | undefined> {
    return this.categoryService.getCategory(categoryId);
  }

  @Roles(Role.ADMIN, Role.SUPER_ADMIN, Role.PUBLISHER)
  @UseGuards(RolesGuard)
  @Delete('/:categoryId')
  private deleteCategory(
    @Param('categoryId', ParseUUIDPipe) categoryId: string,
  ): Promise<Category | undefined> {
    return this.categoryService.deleteCategory(categoryId);
  }

  @Public()
  @Get()
  private getCategories(): Promise<Category[] | undefined> {
    return this.categoryService.getCategories();
  }
}
