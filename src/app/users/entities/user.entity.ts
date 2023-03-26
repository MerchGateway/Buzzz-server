import * as bcrypt from 'bcrypt';
import { Role } from 'src/types/general';
import { Authtype } from 'src/types/authenticator';
import { IdentityProvider } from 'src/types/user';

import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Wallet } from '../../wallet/entities/wallet.entity';
import { Product } from 'src/app/product/product.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'identity_provider',
    nullable: true,
    select: false,
  })
  identityProvider: IdentityProvider | null;

  @Column({
    name: 'identity_provider_id',
    unique: true,
    nullable: true,
    select: false,
  })
  identityProviderId: string | null;

  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column({ select: false, nullable: true })
  password: string;

  @Column({ type: 'enum', enum: Role, default: Role.USER })
  role: Role;

  @Column({ nullable: true })
  bio: string;

  @Column({ nullable: true })
  phoneNumber: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true, type: 'simple-json' })
  shipping_address: {
    street_number: number;
    state: string;
    LGA: string;
    Nearest_bustop: string;
    street: string;
  };

  @Column({ name: 'is_public', default: true })
  isPublic: boolean;

  @Column({ name: 'notification', default: true })
  allowNotification: boolean;

  @Column({
    name: '2fa',
    type: 'simple-json',
    default: {
      allow2Fa: false,
      isTwoFactorVerified: false,
      type: Authtype.INAPP,
    },
  })
  twoFactorAuthentication: {
    allow2fa: boolean;
    isTwoFactorVerified: boolean;
    type: Authtype;
  };

  @Column({ name: 'show_email', default: true })
  showEmail: boolean;

  @Column({ nullable: true })
  instagram: string;

  @Column({ nullable: true })
  facebook: string;

  @Column({ nullable: true })
  twitter: string;

  @Column({ nullable: true })
  reddit: string;

  @JoinColumn({ name: 'wallet_id' })
  wallet: Wallet;

  @OneToMany(() => Product, (product) => product.seller)
  products: Product[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  private async hashPassword() {
    const salt = await bcrypt.genSalt(10);
    this.password = bcrypt.hashSync(this.password, salt);
  }

  public async matchPassword(enteredPassword: string) {
    return await bcrypt.compare(enteredPassword, this.password);
  }
}
