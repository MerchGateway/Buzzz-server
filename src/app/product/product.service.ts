import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsUtils, Repository } from 'typeorm';
import {
	paginate,
	Pagination,
	IPaginationOptions,
} from 'nestjs-typeorm-paginate';
import { CreateProductDto, EditProductDto } from './dto/product.dto';
import { Product } from './entities/product.entity';
import { User } from '../users/entities/user.entity';
import { CloudinaryProvider } from 'src/providers/cloudinary.provider';
import { CLOUDINARY } from 'src/constant';
import { UploadApiResponse } from 'cloudinary';
import { SuccessResponse } from 'src/utils/response';

@Injectable()
export class ProductService {
	constructor(
		@InjectRepository(Product)
		private readonly productRepository: Repository<Product>,
		@Inject(CLOUDINARY)
		private readonly imageStorage: CloudinaryProvider
	) {}

	public async createProduct(
		body: CreateProductDto,
		user: User
	): Promise<Product> {
		const image = (await this.imageStorage.uploadPhoto(body.thumbnail, {
			asset_folder: user.username,
			public_id_prefix: 'thumbnail',
		})) as UploadApiResponse;

		const product: Product = new Product();
		product.name = body.name;
		product.price = body.price;
		product.category = body.categoryId as any;
		product.seller = user;
		product.isPublic = body.isPublic;
		product.seller = user.id as any;
		product.description = body.description;
		product.thumbnail = {
			publicId: image.public_id,
			url: image.secure_url,
		};
		product.customizationInstructions = body.customizationInstructions;
		return this.productRepository.save(product);
	}

	async handleEditProduct(body: EditProductDto, id: string) {
		try {
			const product = await this.handleGetAProduct(id);
			await this.productRepository
				.createQueryBuilder('updateP')
				.update()
				.where('id= :id', { id: product.id })
				.set({
					name: body.name,
					price: body.price,
					category: { id: body.categoryId },
					description: body.description,
					customizationInstructions: body.customizationInstructions,
				})
				.execute();
			return await this.handleGetAProduct(id);
		} catch (err) {
			throw err;
		}
	}

	async handleUpdatePaymentRecord(receiptId: string, id: string) {
		await this.productRepository
			.createQueryBuilder('addPayrecord')
			.update()
			.where('id = :id', { id: id })
			.set({
				receiptId,
				purchased: true,
			})
			.execute();
		return await this.handleGetAProduct(id);
	}

	async handleSetVisibility(id: string) {
		try {
			const product = await this.handleGetAProduct(id);
			product.isPublished = !product.isPublished;
			await product.save();
			return product;
		} catch (err) {
			throw err;
		}
	}

	async handleQueryProducts(
		{ limit, page, route }: IPaginationOptions,
		searchQuery: any
	) {
		const qb = this.productRepository.createQueryBuilder('product');
		FindOptionsUtils.joinEagerRelations(
			qb,
			qb.alias,
			this.productRepository.metadata
		);
		qb.leftJoin('product.seller', 'seller');
		qb.where(
			'product.name = :name OR product.price = :price OR product.seller_id = :sellerId OR seller.username = :username',
			{
				name: searchQuery?.name,
				price: searchQuery?.price,
				sellerId: searchQuery?.sellerId,
				username: searchQuery?.username,
			}
		);
		qb.orderBy('product.createdAt', 'DESC');

		return paginate<Product>(qb, { limit, page, route });
	}
	async handleGetAProduct(id: string) {
		const product = await this.productRepository
			.createQueryBuilder('product')
			.leftJoin('product.category', 'category')
			.leftJoin('product.design', 'design')
			.leftJoin('product.seller', 'seller')
			.where('product.id = :id', { id })
			.addSelect([
				'category',
				'design',
				'seller.id',
				'seller.firstName',
				'seller.lastName',
				'seller.username',
				'seller.email',
			])
			.getOne();

		if (!product) {
			throw new NotFoundException('No product with this credential(s) found');
		}

		return product;
	}

	async handleGetAllProducts(
		options: IPaginationOptions
	): Promise<Pagination<Product>> {
		const qb = this.productRepository.createQueryBuilder('p');
		FindOptionsUtils.joinEagerRelations(
			qb,
			qb.alias,
			this.productRepository.metadata
		);
		qb.where('p.isPublic = :isPublic', { isPublic: true });
		qb.orderBy('p.createdAt', 'DESC');

		return paginate<Product>(qb, options);
	}

	async updateAvailability(id: string, { inStock }) {
		const product = await this.handleGetAProduct(id);
		product.inStock = inStock;
		return await product.save();
	}
	async deleteProduct(id: string) {
		const product = await this.handleGetAProduct(id);
		if (!product)
			throw new NotFoundException(`product with id  ${id} does not exist`);
		await this.productRepository.delete(id);

		return new SuccessResponse(
			null,
			`Product with id ${id} deleted successfully deleted`
		);
	}
}
