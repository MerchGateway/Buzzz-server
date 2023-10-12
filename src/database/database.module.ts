import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from 'src/database/ormconfig';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { migrations, entities, ...rest } = AppDataSource.options;
        return {
          ...rest,
          migrationsRun: true,
          autoLoadEntities: true,
        };
      },
    }),
  ],
})
export class DatabaseModule {}
