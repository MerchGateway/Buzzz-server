import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSeederService } from './user.service';
import { User } from '../../../app/users/entities/user.entity';
import { Category } from '../../../app/category/entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Category])],
  providers: [UserSeederService],
  exports: [UserSeederService],
})
export class UserSeederModule {}
