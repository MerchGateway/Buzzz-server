import {
  Entity,
  Column,
  BaseEntity,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
  // TableColumn,
} from 'typeorm';

import { User } from '../../users/entities/user.entity';

import connection from 'src/app/payment/paystack/utils/connection';
import { Status } from 'src/types/transaction';
import { Order } from 'src/app/order/entities/order.entity';

@Entity('transaction')
export class Transaction extends BaseEntity {

  constructor() {
    super();
    
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, {
    cascade: true,
  })
  @JoinColumn({ name: 'client_id' })
  user: User;

  @Column({ type: 'varchar', unique: true })
  reference: string;

  @Column({ type: 'varchar', nullable: true })
  fee: string;

  @Column({ type: 'numeric', nullable: true })
  amount: number;

  @Column({ type: 'varchar', nullable: true })
  currency: string;

  @Column({ type: 'varchar', nullable: true })
  message: string;

  @Column({ type: 'enum', enum: Status, default: Status.PENDING })
  status: string;

  @OneToMany(() => Order, (order) => order.transaction, { eager: true })
  orders: Order[];

  @CreateDateColumn()
  created_at: Date;

  @Column({
    type: 'enum',
    enum: ['card', 'bank', 'ussd', 'qr', 'mobile_money', 'bank_transfer'],
  })
  channel: string;

  @UpdateDateColumn()
  updated_at: Date;

}
