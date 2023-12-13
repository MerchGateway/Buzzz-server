import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../../app/users/entities/user.entity';
import { SUPER_ADMIN, TEMPORARY_CATEGORIES } from './data';
import { Category } from '../../../app/category/entities/category.entity';
import { WalletService } from '../../../app/wallet/wallet.service';
import { Wallet } from '../../../app/wallet/entities/wallet.entity';
import { Role } from 'src/types/general';

@Injectable()
export class UserSeederService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(Wallet)
    private walletRepository: Repository<Wallet>,
  ) {}

  async create() {
    await this.createSuperAdmin();
    await this.createTemporaryCategories();
  }

  private async createSuperAdmin() {
    const existingSuperAdmin = await this.userRepository.findOne({
      where: {
        email: SUPER_ADMIN.email,
        role: Role.SUPER_ADMIN,
      },
    });

    if (existingSuperAdmin) {
      return existingSuperAdmin;
    }

    console.log(SUPER_ADMIN);
    let wallet = this.walletRepository.create();
    wallet = await this.walletRepository.save(wallet);

    const superAdmin = this.userRepository.create({ ...SUPER_ADMIN, wallet });

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
