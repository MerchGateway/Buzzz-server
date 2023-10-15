import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../../app/users/entities/user.entity';
import { SUPER_ADMIN, TEMPORARY_CATEGORIES } from './data';
import { Category } from '../../../app/category/entities/category.entity';

@Injectable()
export class UserSeederService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async create() {
    await this.createSuperAdmin();
    await this.createTemporaryCategories();
  }

  private async createSuperAdmin() {
    const existingSuperAdmin = await this.userRepository.findOne({
      where: {
        email: SUPER_ADMIN.email,
      },
    });

    if (existingSuperAdmin) {
      return existingSuperAdmin;
    }

    const superAdmin = this.userRepository.create(SUPER_ADMIN);

    return await this.userRepository.save(superAdmin);
  }

  private async createTemporaryCategories() {
    const existingCategories = await this.categoryRepository.find();

    if (existingCategories.length > 0) {
      return existingCategories;
    }

    const categories = this.categoryRepository.create(TEMPORARY_CATEGORIES);

    return await this.categoryRepository.save(categories);
  }
}
