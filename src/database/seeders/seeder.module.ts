import { Module } from '@nestjs/common';
import { Seeder } from './seeder';
import { FeeSeederModule } from './fee/fee.module';
import { UserSeederModule } from './users/user.module';

@Module({
  imports: [FeeSeederModule, UserSeederModule],
  providers: [Seeder],
  exports: [Seeder],
})
export class SeederModule {}
