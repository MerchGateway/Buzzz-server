import {
  Entity,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  PrimaryColumn,
} from 'typeorm';
import { Category } from '../category/entities/category.entity';
import { PaymentReceipt } from '../payment/entities/payment.entity';

<<<<<<< HEAD
import {Cart} from "../cart/entities/cart.entity"
@Entity()
=======
@Entity({ name: 'product', schema: 'public' })
>>>>>>> origin/staging
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ default: false })
  inStock: boolean;

  @Column({ type: 'numeric' })
  price: number;

  @Column({ default: false })
  isPublished: boolean;

<<<<<<< HEAD
 
  @CreateDateColumn()
=======
  @PrimaryColumn()
  categoryId: string;

  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn()
  category: Category;

  @Column({ default: null })
  receiptId: string;

  @Column({ default: false })
  purchased: boolean;

  @ManyToOne(() => PaymentReceipt, (paymentReceipt) => paymentReceipt.product)
  @JoinColumn()
  receipt: PaymentReceipt;

  @CreateDateColumn({ name: 'created_at' })
>>>>>>> origin/staging
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
