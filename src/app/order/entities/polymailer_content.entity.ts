
import {
  BaseEntity,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  PrimaryGeneratedColumn,
 
} from 'typeorm';

@Entity('polymailer_content')
export class PolyMailerContent extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;


  @Column({ type: 'varchar'})
  content: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
