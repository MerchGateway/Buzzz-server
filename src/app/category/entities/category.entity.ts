import { Product } from 'src/app/product/product.entity';
import {
  BaseEntity,
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';

@Entity('category')
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({
    type: 'varchar',
    unique: true,
    transformer: { to: (value) => value.trim(), from: (value) => value },
  })
  name: string;
  @Column({
    type: 'varchar',
    transformer: { to: (value) => value.trim(), from: (value) => value },
  })
  description: string;

  @OneToMany(() => Product, (products) => products.category,{onDelete:"SET NULL"})
  products: Product[];

@CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;
}
