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
  Query,
  DefaultValuePipe,
  ParseIntPipe,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { Pagination } from 'nestjs-typeorm-paginate';
import { EditProductDto } from './dto/product.dto';
import { Product } from './entities/product.entity';
import { ProductService } from './product.service';
import { CategoryService } from '../category/category.service';
import { Public } from 'src/decorators/public.decorator';
import { Patch } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Controller('product')
export class ProductController {
  constructor(
    @Inject(CategoryService)
    private readonly categoryService: CategoryService,
    @Inject(ProductService)
    private readonly productService: ProductService,
    private readonly configService: ConfigService,
  ) {}

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
    return this.productService.handleSetVisibility(id);
  }

  @Put('edit/:id')
  public async editProduct(
    @Body() body: EditProductDto,
    @Param('id') id: string,
  ) {
    if (body.categoryId) {
      await this.categoryService.getCategory(body.categoryId);
    }
    return this.productService.handleEditProduct(body, id);
  }

  //seach or filter product by price || name || or any other field that would be added
  @Public()
  @Get('search')
  public queryProducts(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
    @Query() searchQuery: any,
  ) {
    return this.productService.handleQueryProducts(
      {
        limit,
        page,
        route: `${this.configService.get<string>('appUrl')}/product/search`,
      },
      searchQuery,
    );
  }

  @Public()
  @Get(':id')
  public getAProduct(@Param('id') id: string): Promise<Product | string> {
    return this.productService.handleGetAProduct(id);
  }

  @Public()
  @Get()
  public getAllProducts(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
  ): Promise<Pagination<Product>> {
    limit = limit > 100 ? 100 : limit < 10 ? 10 : limit;

    return this.productService.handleGetAllProducts({
      page,
      limit,
      route: `${this.configService.get<string>('appUrl')}/product`,
    });
  }

  @Patch('availability:id')
  public updateProductAvailability(
    @Param('id') id: string,
    @Body() data: { inStock: boolean },
  ): Promise<Product | string> {
    return this.productService.updateAvailability(id, data);
  }
}
