import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
  ManyToMany,
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
import { Fee } from '../../fee/entities/fee.entity';
import { DecimalTransformer } from '../../../utils/transformers/decimal';
@Entity()
export class Transaction extends Timestamp {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Wallet, (wallet) => wallet.transactions)
  @JoinColumn({ name: 'wallet_id' })
  wallet: Wallet;

  @Column()
  reference: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    transformer: new DecimalTransformer(),
  })
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

  @ManyToMany(() => Order, (order) => order.transactions)
  orders: Order[];

  @Column({
    type: 'enum',
    enum: TransactionChannel,
  })
  channel: TransactionChannel;

  @ManyToOne(() => Fee)
  @JoinColumn({ name: 'fee_id' })
  fee: Fee;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0,
    transformer: new DecimalTransformer(),
  })
  feeAmount: number;

  @Column({ name: 'is_hidden', default: false })
  isHidden: boolean;

  @Column({ name: 'transfer_code', nullable: true })
  transferCode: string | null;
}
