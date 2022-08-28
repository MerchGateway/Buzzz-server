import {
  Body,
  Controller,
  Inject,
  Post,
  Put,
  Param,
  UseInterceptors,
  UploadedFiles,
  Get,
  Delete,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { Pagination } from 'nestjs-typeorm-paginate';
import { CreateProductDto, EditProductDto } from './product.dto';
import { Product } from './product.entity';
import { ProductService } from './product.service';
import { CategoryService } from '../category/category.service';

@Controller('product')
export class ProductController {
  constructor(
    @Inject(CategoryService)
    private readonly categoryService: CategoryService,

    @Inject(ProductService)
    private readonly service: ProductService,
  ) {}

  @Post('create-new')
  public async createProduct(@Body() body: CreateProductDto): Promise<Product> {
    await this.categoryService.getCategory(body.categoryId);
    return this.service.createProduct(body);
  }

  @Post('upload')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'pic_1', maxCount: 1 },
      { name: 'pic_2', maxCount: 1 },
    ]),
  )
  uploadFile(
    @UploadedFiles()
    files: {
      pic_1?: Express.Multer.File[];
      pic_2?: Express.Multer.File[];
    },
  ) {
    console.log(files);
  }

  @Put('set-visibility/:id')
  public setVisibility(@Param('id') id: string) {
    return this.service.handleSetVisibility(id);
  }

  @Put('edit/:id')
  public async editProduct(
    @Body() body: EditProductDto,
    @Param('id') id: string,
  ) {
    if (body.categoryId) {
      await this.categoryService.getCategory(body.categoryId);
    }
    return this.service.handleEditProduct(body, id);
  }

  //seach or filter product by price || name || or any other field that would be added
  @Get('search')
  public queryProducts(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
    @Query() searchQuery: any,
  ) {
    return this.service.handleQueryProducts(
      {
        limit,
        page,
        route: 'http://localhost:5000/product/search',
      },
      searchQuery,
    );
  }

  @Get(':id')
  public getAProduct(@Param('id') id: string): Promise<Product | string> {
    return this.service.handleGetAProduct(id);
  }

  @Get()
  public getAllProducts(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
  ): Promise<Pagination<Product>> {
    limit = limit > 100 ? 100 : limit;

    return this.service.handleGetAllProducts({
      page,
      limit,
      route: 'http://localhost:5000/product',
    });
  }

  @Delete(':id')
  public deleteAProduct(@Param('id') id: string): Promise<Product | string> {
    return this.service.handleDeleteAProduct(id);
  }
}
