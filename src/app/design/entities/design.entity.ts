import {
  BaseEntity,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  OneToOne,
  Column,
  JoinColumn,
} from 'typeorm';
import { Product } from 'src/app/product/product.entity';
import { User } from 'src/app/users/entities/user.entity';
import { ImageBody } from 'src/types/asset';
import { IMAGE_TYPE, TEXT_TYPE } from 'src/constant';
import { IsOptional } from 'class-validator';

@Entity('design')
export class Design extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Product, (product: Product) => product.design, {
    onDelete: 'CASCADE',
  })
  product: Product;

  @ManyToOne(() => User, (user) => user.designs, {
    onDelete: 'CASCADE',
    eager: true,
  })
  @JoinColumn()
  owner: User;

  @Column({ type: 'bool', default: false })
  published: boolean;

  @Column({ type: 'simple-json' })
  design_data: any;

  @Column({
    type: 'json',
    nullable: true,
  })
  @IsOptional()
  images?: ImageBody[];

  @Column('simple-array', { nullable: true })
  texts?: String[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
