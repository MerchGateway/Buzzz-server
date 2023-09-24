import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Wallet } from '../../wallet/entities/wallet.entity';

export enum TransactionMethod {
  DEBIT = 'DEBIT',
  CREDIT = 'CREDIT',
}

export enum TransactionType {
  WITHDRAWAL = 'WITHDRAWAL',
  SALES = 'SALES',
}

export enum TransactionStatus {
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
}

@Entity()
export class WalletTransaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Wallet, (wallet) => wallet.transactions)
  @JoinColumn({ name: 'wallet_id' })
  wallet: Wallet;

  @Column({
    type: 'enum',
    enum: TransactionType,
    default: TransactionType.SALES,
  })
  type: TransactionType;

  @Column({
    type: 'enum',
    enum: TransactionMethod,
  })
  method: TransactionMethod;

  @Column({
    type: 'enum',
    enum: TransactionStatus,
    default: TransactionStatus.SUCCESS,
  })
  status: TransactionStatus;

  @Column({ nullable: true })
  reference: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
