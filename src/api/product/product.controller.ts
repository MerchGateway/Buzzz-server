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
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { CreateProductDto, EditProductDto } from './product.dto';
import { Product } from './product.entity';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  @Inject(ProductService)
  private readonly service: ProductService;

  @Post('create-new')
  public createProduct(@Body() body: CreateProductDto): Promise<Product> {
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
  public editProduct(@Body() body: EditProductDto, @Param('id') id: string) {
    return this.service.handleEditProduct(body, id);
  }

  @Get(':id')
  public getAProduct(@Param('id') id: string): Promise<Product | string> {
    return this.service.handleGetAProduct(id);
  }

  @Get()
  public getAllProducts(): Promise<[Product[], number]> {
    return this.service.handleGetAllProducts();
  }

  @Get('search')
  public queryProducts(@Query() query: EditProductDto) {
    return this.service.handleQueryProducts(query);
  }

  @Delete(':id')
  public deleteAProduct(@Param('id') id: string): Promise<Product | string> {
    return this.service.handleDeleteAProduct(id);
  }
}
