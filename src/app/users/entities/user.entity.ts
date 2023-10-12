import * as bcrypt from 'bcrypt';
import { Role } from 'src/types/general';
import { AuthType } from 'src/types/authenticator';
import { IdentityProvider } from 'src/types/user';
import { Design } from 'src/app/design/entities/design.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  OneToOne,
} from 'typeorm';
import { LogisticsPartner } from 'src/app/admin/logistics-partners/entities/logistics-partner.entity';
import { PrintingPartner } from 'src/app/admin/printing-partners/entities/printing-partner.entity';
import { Wallet } from '../../wallet/entities/wallet.entity';
import { Product } from 'src/app/product/entities/product.entity';
import { ForbiddenException } from '@nestjs/common';
import { generateFromEmail } from 'unique-username-generator';
import { Timestamp } from '../../../database/timestamp.entity';

@Entity()
export class User extends Timestamp {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'identity_provider',
    type: 'enum',
    enum: IdentityProvider,
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

  @Column({ name: 'first_name', nullable: true })
  firstName: string | null;

  @Column({ name: 'last_name', nullable: true })
  lastName: string | null;

  @Column({ select: false, nullable: true })
  password: string | null;

  @Column({ select: false, nullable: true })
  pin: string | null;

  @Column({ type: 'enum', enum: Role, default: Role.USER })
  role: Role;

  @Column({ nullable: true })
  bio: string | null;

  @Column({ name: 'phone_number', nullable: true })
  phoneNumber: string | null;

  @Column({ nullable: true })
  address: string | null;

  @Column({ nullable: true, type: 'simple-json', name: 'shipping_address' })
  shippingAddress: {
    streetNumber: number;
    state: string;
    LGA: string;
    nearestBusStop: string;
    street: string;
  } | null;

  @Column({ name: 'is_public', default: true })
  isPublic: boolean;

  @Column({ name: 'allow_notification', default: false })
  allowNotification: boolean;

  @ManyToOne(
    () => PrintingPartner,
    (printingPartner) => printingPartner.administrators,
    { onDelete: 'SET NULL' },
  )
  @JoinColumn({ name: 'printing_partner' })
  printingPartner: PrintingPartner | null;

  @ManyToOne(
    () => LogisticsPartner,
    (logisticsPartner) => logisticsPartner.administrators,
    { onDelete: 'SET NULL' },
  )
  @JoinColumn({ name: 'logistics_partner' })
  logisticsPartner: LogisticsPartner | null;

  @Column({
    name: 'registration_token',
    nullable: true,
    unique: true,
    select: false,
  })
  registrationToken: string;

  @OneToMany(() => Design, (design) => design.user)
  designs: Design[];

  @Column({
    name: 'allow_two_factor_authentication',
    default: false,
  })
  allow2fa: boolean;

  @Column({ name: 'is_two_factor_verified', default: false })
  isTwoFactorVerified: boolean;

  @Column({
    name: 'two_factor_type',
    type: 'enum',
    enum: AuthType,
    default: AuthType.GOOGLE,
  })
  twoFactorType: AuthType;

  @Column({ name: 'show_email', default: true })
  showEmail: boolean;

  @Column({ nullable: true })
  instagram: string | null;

  @Column({ unique: true })
  username: string;

  @Column({ nullable: true })
  facebook: string | null;

  @Column({ nullable: true })
  twitter: string | null;

  @Column({ nullable: true })
  reddit: string | null;

  @OneToOne(() => Wallet, (wallet) => wallet.user)
  @JoinColumn({ name: 'wallet_id' })
  wallet: Wallet;

  @OneToMany(() => Product, (product) => product.seller)
  products: Product[];

  hasPin?: boolean;

  @BeforeInsert()
  @BeforeUpdate()
  private async hashPassword() {
    if (this.password) {
      const salt = await bcrypt.genSalt(10);
      this.password = bcrypt.hashSync(this.password, salt);
    }
  }

  @BeforeInsert()
  @BeforeUpdate()
  private async hashPin?() {
    if (this.pin) {
      const salt = await bcrypt.genSalt(10);
      this.pin = bcrypt.hashSync(this.pin, salt);
    }
  }

  public async matchPin?(enteredPin: string) {
    if (!this.pin) {
      throw new ForbiddenException('User has no pin');
    }
    return await bcrypt.compare(enteredPin, this.pin);
  }

  @BeforeUpdate()
  @BeforeInsert()
  private setUsername() {
    // ensure username is generated only once as long as it is already set
    if (!this.username) {
      const username = generateFromEmail(this.email, 3);
      this.username = username;
    }
  }

  public async matchPassword(enteredPassword: string) {
    return await bcrypt.compare(enteredPassword, this.password);
  }
}
