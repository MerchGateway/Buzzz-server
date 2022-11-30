
import {
  BaseEntity,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('contact_us')
export class Contact extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('email')
  email: string;

  @Column('message')
  message: string;
  
  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
