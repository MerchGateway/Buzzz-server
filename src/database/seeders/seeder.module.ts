import { Module } from '@nestjs/common';
import { Seeder } from './seeder';
import { FeeSeederModule } from './fee/fee.module';
import { UserSeederModule } from './users/user.module';
import { MysqlDatabaseProviderModule } from '../providers/mysql.provider.module';
import { ColorAndSizesSeederModule } from './color-and-sizes/colors-and-sizes.module';

@Module({
  imports: [
    MysqlDatabaseProviderModule,
    FeeSeederModule,
    UserSeederModule,
    ColorAndSizesSeederModule,
  ],
  providers: [Seeder],
  exports: [Seeder],
})
export class SeederModule {}
