import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { Timestamp } from "../../../database/timestamp.entity";
import { NigerianStates } from "src/types/States";
import { ColorAndSizes } from "src/types/color-and-sizes";
import { DecimalTransformer } from "src/utils/transformers/decimal";
@Entity()
export class ColorsAndSizes extends Timestamp {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "enum", enum: NigerianStates })
  state: NigerianStates;

  @Column({ type: "simple-array" })
  colorAndSizes: ColorAndSizes[];

  @Column({
    type: "decimal",
    precision: 10,
    scale: 2,
    transformer: new DecimalTransformer(),
  })
  ownerFee: number;

  @Column({
    type: "decimal",
    precision: 10,
    scale: 2,
    transformer: new DecimalTransformer(),
  })
  resellerFee: number;
}
