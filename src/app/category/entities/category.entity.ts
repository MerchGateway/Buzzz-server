import { Product } from '../../product/entities/product.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Timestamp } from '../../../database/timestamp.entity';

@Entity()
export class Category extends Timestamp {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    unique: true,
    transformer: { to: (value) => value.trim(), from: (value) => value },
  })
  name: string;

  @Column({
    transformer: { to: (value) => value.trim(), from: (value) => value },
  })
  description: string;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}
