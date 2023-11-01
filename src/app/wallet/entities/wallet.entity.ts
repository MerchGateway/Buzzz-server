import { Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Transaction } from '../../transaction/entities/transaction.entity';
import { Timestamp } from '../../../database/timestamp.entity';

@Entity()
export class Wallet extends Timestamp {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => User, (user) => user.wallet)
  user: User;

  @OneToMany(() => Transaction, (transaction) => transaction.wallet)
  transactions: Transaction[];

  balance?: number;
}
