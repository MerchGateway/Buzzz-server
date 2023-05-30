import { Module } from '@nestjs/common';
import { DesignService } from './design.service';

@Module({
  providers: [DesignService]
})
export class DesignModule {}
