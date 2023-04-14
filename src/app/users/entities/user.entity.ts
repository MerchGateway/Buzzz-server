import * as bcrypt from 'bcrypt';
import { Role } from 'src/types/general';
import { Authtype } from 'src/types/authenticator';
import { IdentityProvider } from 'src/types/user';

import {
  BeforeInsert,
  BeforeUpdate,
  AfterInsert,
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
import { Inject } from '@nestjs/common';
// import { UsernameGenerator } from 'src/providers/usernameGenerator.provider';
// import { USERNAME_GENERATOR } from 'src/constant';
import {
  generateFromEmail,
  uniqueUsernameGenerator,
} from 'unique-username-generator';

@Entity()
export class User {
  // constructor(
  //   @Inject(USERNAME_GENERATOR)
  //   private readonly usernameGenerator: UsernameGenerator
  // ) {}

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

  @Column({ name: 'notification', default: false })
  allowNotification: boolean;

  @Column({
    name: 'registeration-token',
    type: 'varchar',
    nullable: true,
    unique: true,
    select: false,
  })
  registerationToken: string;

  @Column({
    name: 'allow_twofactor_authentication',
    type: 'bool',
    default: false,
  })
  allow2fa: boolean;

  @Column({ name: 'is_twofactor_verified', type: 'bool', default: false })
  isTwoFactorVerified: boolean;

  @Column({
    name: 'two_factor_type',
    type: 'enum',
    enum: Authtype,
    default: Authtype.GOOGLE,
  })
  twoFactorType: Authtype;

  @Column({ name: 'show_email', type: 'bool', default: true })
  showEmail: boolean;

  @Column({ nullable: true })
  instagram: string;

  @Column({ nullable: true })
  username: string;

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

  @BeforeUpdate()
  @BeforeInsert()
  private setUsername() {
    // ensure username is generated only once as long as it is already set
    if (!this.username) {
     
      const username = generateFromEmail(this.email, 3);
      this.username = username;
      console.log(this.username);
    }
  }

  public async matchPassword(enteredPassword: string) {
    return await bcrypt.compare(enteredPassword, this.password);
  }
}
