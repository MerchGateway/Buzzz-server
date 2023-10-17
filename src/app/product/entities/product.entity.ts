import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { Category } from '../../category/entities/category.entity';
import { PaymentReceipt } from '../../payment/entities/payment.entity';
import { User } from '../../users/entities/user.entity';
import { ImageBody } from 'src/types/asset';
import { Design } from '../../design/entities/design.entity';
import { Timestamp } from '../../../database/timestamp.entity';
@Entity()
export class Product extends Timestamp {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({
    type: 'simple-json',
    nullable: true,
  })
  thumbnail: ImageBody;

  @Column({ name: 'in_stock', default: true })
  inStock: boolean;

  @Column({ type: 'numeric' })
  price: number;

  @Column({ nullable: true })
  description: string | null;

  @Column({ name: 'is_published', default: false })
  isPublished: boolean;

  @Column({ name: 'is_public', default: true })
  isPublic?: boolean;

  @ManyToOne(() => Category, (category) => category.products, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @Column({ name: 'receipt_id', nullable: true })
  receiptId: string | null;

  @Column({ default: false })
  purchased: boolean;

  @Column({ nullable: true })
  bio: string | null;

  @ManyToOne(() => PaymentReceipt, (paymentReceipt) => paymentReceipt.product)
  @JoinColumn({ name: 'receipt_id' })
  receipt: PaymentReceipt;

  @ManyToOne(() => User, (user) => user.products, { eager: true })
  @JoinColumn({ name: 'seller_id' })
  seller: User;

  @OneToOne(() => Design, (design) => design.product, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'design_id' })
  design: Design;
}
