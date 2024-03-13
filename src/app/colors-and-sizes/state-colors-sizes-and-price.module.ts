import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ColorsAndSizes } from "src/app/colors-and-sizes/entities/state-colors-sizes-and-price.entity";
import { ColorAndSizesController } from "./state-colors-sizes-and-price.controller";
import { ColorAndSizesService } from "./state-colors-sizes-and-price.service";
@Module({
  imports: [TypeOrmModule.forFeature([ColorsAndSizes])],
  controllers: [ColorAndSizesController],
  providers: [ColorAndSizesService],
  exports: [ColorAndSizesService],
})
export class ColorAndSizesModule {}
