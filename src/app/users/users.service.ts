import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { WalletService } from '../wallet/wallet.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly walletService: WalletService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const wallet = await this.walletService.createWallet();

    const user = this.userRepository.create({ ...createUserDto, wallet });

    return await this.userRepository.save(user);
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return user;
  }

  async findOneBy(conditions: FindOptionsWhere<User>) {
    const user = await this.userRepository.findOneBy(conditions);

    if (!user) {
      throw new NotFoundException(
        'User with provided conditions does not exist',
      );
    }

    return user;
  }

  async update(user: User, updateUserDto: UpdateUserDto) {
    await this.userRepository.update(user.id, updateUserDto);

    user = await this.findOne(user.id);

    return user;
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
