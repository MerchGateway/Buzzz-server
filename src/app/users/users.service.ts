import {
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { WalletService } from '../wallet/wallet.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { SuccessResponse } from '../../utils/response';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @Inject(forwardRef(() => WalletService))
    private readonly walletService: WalletService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const wallet = await this.walletService.createWallet();

    const user = this.userRepository.create({ ...createUserDto, wallet });

    return await this.userRepository.save(user);
  }

  async findAll(query?: FindOptionsWhere<User>) {
    const users = await this.userRepository.find({ where: query });

    if (!users) {
      throw new NotFoundException(
        'User{s} with provided condition does not exist',
      );
    }

    return users;
  }

  async findOne(id: string) {
    const user = await this.findOneProfile(id);
    return new SuccessResponse(user, 'User retrieved successfully');
  }

  async findOneBy(username: string) {
    const user = await this.userRepository.findOneBy({ username });

    if (!user) {
      throw new NotFoundException(
        `User with provided username ${username} does not exist`,
      );
    }

    return user;
  }

  async update(user: User, updateUserDto: UpdateUserDto) {
    await this.userRepository.update(user.id, updateUserDto);

    user = await this.findOneProfile(user.id);

    return user;
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }

  async findOneProfile(id: string) {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.id = :id', { id })
      .addSelect('user.pin')
      .getOne();

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    if (!!user.pin) {
      user.hasPin = true;
    } else {
      user.hasPin = false;
    }

    delete user.pin;

    return user;
  }
}
