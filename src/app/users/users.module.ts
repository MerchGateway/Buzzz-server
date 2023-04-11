import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { WalletModule } from '../wallet/wallet.module';
import * as usernameGenerator from 'unique-username-generator';

@Module({
  imports: [WalletModule, TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: 'USERNAME_GENERATOR',
      useValue: usernameGenerator,
    },
  ],
  exports: [UsersService],
})
export class UsersModule {}
