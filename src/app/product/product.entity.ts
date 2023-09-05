import {
  Entity,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { Category } from '../category/entities/category.entity';
// import { Order } from '../order/entities/order.entity';
import { PaymentReceipt } from '../payment/entities/payment.entity';
import { User } from '../users/entities/user.entity';
import { Design } from '../design/entities/design.entity';
@Entity({ name: 'product', schema: 'public' })
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: false })
  name: string;

  @Column({ type: 'varchar', nullable: true, default: 'noimage.png' })
  thumbnail: string;

  @Column({ default: true })
  inStock: boolean;

  @Column({ type: 'numeric' })
  price: number;

  @Column({ type: 'varchar', nullable: true })
  description: string;

  @Column({ default: false })
  isPublished: boolean;

  @CreateDateColumn()
  @PrimaryColumn()
  categoryId: string;

  @ManyToOne(() => Category, (category) => category.products,{eager:true,onDelete:"CASCADE"})
  @JoinColumn()
  category: Category;

  @Column({ default: null })
  receiptId: string;

  @Column({ default: false })
  purchased: boolean;

  @Column({ nullable: true })
  bio: string;

  @ManyToOne(() => PaymentReceipt, (paymentReceipt) => paymentReceipt.product)
  @JoinColumn()
  receipt: PaymentReceipt;

  @Column({ default: null })
  sellerId: string;

  @ManyToOne(() => User, (user) => user.products, { eager: true })
  @JoinColumn()
  seller: User;

  @OneToOne(() => Design, (design) => design.product, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  design: Design;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
