import { Product } from 'src/app/product/product.entity';
import {
  BaseEntity,
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  JoinColumn,
  Unique,
  OneToMany,
} from 'typeorm';

@Entity()
@Unique(['reference'])
export class PaymentReceipt extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_id: string;

  @OneToMany(() => Product, (product) => product.receipt)
  @JoinColumn()
  product: Product;

  @Column()
  currency: string;

  @Column()
  reference: string;

  @Column()
  broker: string;

  @Column()
  payment_status: string;

  @CreateDateColumn()
  created_at: Date;
}

// export enum PaymentStatus {
//   'FAILED',
//   'SUCCESS',
// }

// export enum Broker {
//   'Paystack',
//   'Flutterwave',
//   'Kuda',
// }
