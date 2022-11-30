import { Module } from '@nestjs/common';
import { ContactController } from './contact.controller';
import { ContactService } from './contact.service';
import { Contact } from './entities/contact.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EMAIL_PROVIDER } from '../../constant';
import { ConfigService } from '@nestjs/config';
import { NodemailerProvider } from '../../providers/nodemailer.provider';

@Module({
  imports: [TypeOrmModule.forFeature([Contact])],
  controllers: [ContactController],
  providers: [
    ContactService,
    {
      provide: EMAIL_PROVIDER,
      useFactory: (configService: ConfigService) => {
        return new NodemailerProvider(configService);
      },
      inject: [ConfigService],
    },
  ],
  exports: [ContactService],
})
export class OrderModule {}
