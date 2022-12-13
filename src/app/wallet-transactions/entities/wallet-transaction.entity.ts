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

export enum TransactionType {
  DEBIT = 'DEBIT',
  CREDIT = 'CREDIT',
}

export enum TransactionMethod {
  WITHDRAWAL = 'WITHDRAWAL',
  SALES = 'SALES',
}

@Entity()
export class WalletTransaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Wallet, (wallet) => wallet.transactions)
  @JoinColumn({ name: 'wallet_id' })
  wallet: Wallet;

  @Column({ type: 'enum', enum: TransactionType })
  type: TransactionType;

  @Column({
    type: 'enum',
    enum: TransactionMethod,
    default: TransactionMethod.SALES,
  })
  method: TransactionType;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
