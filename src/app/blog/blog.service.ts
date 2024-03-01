import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { Repository } from 'typeorm';
import { Blog } from './entities/blog.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { SuccessResponse } from '../../utils/response';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';
import { CLOUDINARY } from '../../constant';
import { CloudinaryProvider } from '../../providers/cloudinary.provider';
import { formatAsDataUri } from '../../utils/file-upload';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Blog)
    private readonly blogRepository: Repository<Blog>,
    @Inject(CLOUDINARY)
    private readonly imageStorage: CloudinaryProvider,
  ) {}

  async create(createBlogDto: CreateBlogDto, imageFile?: Express.Multer.File) {
    let imageUrl = '';
    if (imageFile) {
      const fileAsDataUri = formatAsDataUri(imageFile);
      const image = await this.imageStorage.uploadPhoto(fileAsDataUri.content, {
        asset_folder: 'blogs',
        public_id_prefix: '',
      });
      imageUrl = image.secure_url;
    }

    let blog = this.blogRepository.create({
      ...createBlogDto,
      imageUrl,
    });
    blog = await this.blogRepository.save(blog);

    return new SuccessResponse(blog, 'Blog created successfully', 201);
  }

  findAll(options: IPaginationOptions) {
    const queryBuilder = this.blogRepository.createQueryBuilder('blog');
    queryBuilder.orderBy('blog.created_at', 'DESC');
    return paginate<Blog>(queryBuilder, options);
  }

  async findOne(id: string) {
    const blog = await this.blogRepository.findOne({ where: { id } });

    if (!blog) {
      throw new NotFoundException(`Blog with id ${id} not found`);
    }

    return new SuccessResponse(blog, 'Blog retrieved successfully');
  }

  async update(
    id: string,
    updateBlogDto: UpdateBlogDto,
    imageFile?: Express.Multer.File,
  ) {
    let blog = await this.blogRepository.findOne({ where: { id } });

    if (!blog) {
      throw new NotFoundException(`Blog with id ${id} not found`);
    }

    let imageUrl = '';
    if (imageFile) {
      const fileAsDataUri = formatAsDataUri(imageFile);
      const image = await this.imageStorage.uploadPhoto(fileAsDataUri.content, {
        asset_folder: 'blogs',
        public_id_prefix: '',
      });
      imageUrl = image.secure_url;

      if (blog.imageUrl) {
        const prevImageNamePlusExt = blog.imageUrl.split('/').pop();
        const prevImagePublicId = prevImageNamePlusExt.split('.').shift();
        await this.imageStorage.deletePhoto(prevImagePublicId);
      }
    }

    await this.blogRepository.update(id, {
      ...updateBlogDto,
      imageUrl: imageUrl || blog.imageUrl,
    });

    blog = await this.blogRepository.findOne({ where: { id } });

    return new SuccessResponse(blog, 'Blog updated successfully');
  }

  async remove(id: string) {
    const blog = await this.blogRepository.findOne({ where: { id } });

    if (!blog) {
      throw new NotFoundException(`Blog with id ${id} not found`);
    }

    if (blog.imageUrl) {
      const prevImageNamePlusExt = blog.imageUrl.split('/').pop();
      const prevImagePublicId = prevImageNamePlusExt.split('.').shift();
      await this.imageStorage.deletePhoto(prevImagePublicId);
    }

    await this.blogRepository.delete(id);

    return new SuccessResponse({}, 'Blog deleted successfully');
  }
}
