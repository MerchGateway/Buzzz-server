import {
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { WalletTransaction } from '../../wallet-transactions/entities/wallet-transaction.entity';

@Entity()
export class Wallet {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(
    () => WalletTransaction,
    (walletTransaction) => walletTransaction.wallet,
  )
  transactions: WalletTransaction[];

  balance?: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
