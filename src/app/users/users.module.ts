import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { WalletModule } from '../wallet/wallet.module';
import { UsernameGenerator } from 'src/providers/usernameGenerator.provider';
import { USERNAME_GENERATOR } from 'src/constant';
import { MailModule } from '../../mail/mail.module';

@Module({
  imports: [
    forwardRef(() => WalletModule),
    TypeOrmModule.forFeature([User]),
    MailModule,
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: USERNAME_GENERATOR,
      useClass: UsernameGenerator,
    },
  ],
  exports: [UsersService],
})
export class UsersModule {}
