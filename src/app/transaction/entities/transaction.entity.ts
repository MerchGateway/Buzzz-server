import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import {
  TransactionChannel,
  TransactionCurrency,
  TransactionMethod,
  TransactionStatus,
} from 'src/types/transaction';
import { Order } from 'src/app/order/entities/order.entity';
import { Wallet } from '../../wallet/entities/wallet.entity';

import { Timestamp } from '../../../database/timestamp.entity';
@Entity()
export class Transaction extends Timestamp {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Wallet, (wallet) => wallet.transactions)
  @JoinColumn({ name: 'wallet_id' })
  wallet: Wallet;

  @Column({ unique: true })
  reference: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column({ type: 'enum', enum: TransactionCurrency, nullable: true })
  currency: TransactionCurrency | null;

  @Column({ nullable: true })
  message: string | null;

  @Column({ type: 'enum', enum: TransactionMethod })
  method: TransactionMethod;

  @Column({
    type: 'enum',
    enum: TransactionStatus,
    default: TransactionStatus.PENDING,
  })
  status: TransactionStatus;

  @OneToMany(() => Order, (order) => order.transaction)
  orders: Order[];

  @Column({
    type: 'enum',
    enum: TransactionChannel,
  })
  channel: TransactionChannel;
}
