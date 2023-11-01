import { Product } from 'src/app/product/entities/product.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  Unique,
  OneToMany,
} from 'typeorm';
import { Timestamp } from '../../../database/timestamp.entity';

@Entity()
@Unique(['reference'])
export class PaymentReceipt extends Timestamp {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id' })
  userId: string;

  @OneToMany(() => Product, (product) => product.receipt)
  @JoinColumn()
  product: Product;

  @Column()
  currency: string;

  @Column()
  reference: string;

  @Column()
  broker: string;

  @Column({ name: 'payment_status' })
  paymentStatus: string;
}
