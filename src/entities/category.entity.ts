import {
  BaseEntity,
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
} from 'typeorm';

@Entity('categories')
export class Category extends BaseEntity {
  @PrimaryColumn({ type: 'uuid' })
  id: string;
  @Column({
    type: 'varchar',
    unique: true,
    transformer: { to: (value) => value.trim(), from: (value) => value },
  })
  name: string;
  @Column({
    type: 'varchar',
    transformer: { to: (value) => value.trim(), from: (value) => value },
  })
  description: string;
  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;
}
