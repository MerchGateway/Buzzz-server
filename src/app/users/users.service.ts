import {
  Inject,
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { WalletService } from '../wallet/wallet.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { SuccessResponse } from '../../utils/response';
import { generateToken } from '../../utils';
import { MailService } from '../../mail/mail.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @Inject(forwardRef(() => WalletService))
    private readonly walletService: WalletService,
    private readonly mailService: MailService,
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
    let updateData: Partial<User> = { ...updateUserDto };

    if (updateUserDto.username && updateUserDto.username !== user.username) {
      const userExists = await this.userRepository.findOne({
        where: { username: updateUserDto.username },
      });

      if (userExists) {
        throw new ForbiddenException(
          `User with username ${updateUserDto.username} already exists`,
        );
      }
    }

    if (updateUserDto.email && updateUserDto.email !== user.email) {
      const userExists = await this.userRepository.findOne({
        where: { email: updateUserDto.email },
      });

      if (userExists) {
        throw new ForbiddenException(
          `User with email ${updateUserDto.email} already exists`,
        );
      }

      const emailVerificationToken =
        await this.generateEmailVerificationToken();

      updateData = {
        ...updateData,
        emailVerified: false,
        emailVerificationToken,
      };

      await this.mailService.sendEmailVerification(
        { ...user, email: updateUserDto.email } as User,
        emailVerificationToken,
      );
    }

    await this.userRepository.update(user.id, updateData);

    user = await this.findOneProfile(user.id);

    return user;
  }

  async generateEmailVerificationToken() {
    let emailVerificationToken = generateToken();

    const userExists = await this.userRepository.findOne({
      where: { emailVerificationToken },
    });

    if (userExists) {
      emailVerificationToken = await this.generateEmailVerificationToken();
    }

    return emailVerificationToken;
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }

  async findOneProfile(id: string) {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.id = :id', { id })
      .addSelect('user.pin')
      .leftJoinAndSelect('user.wallet', 'wallet')
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
