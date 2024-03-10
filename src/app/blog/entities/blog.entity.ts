import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Timestamp } from '../../../database/timestamp.entity';

@Entity()
export class Blog extends Timestamp {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true, name: 'image_url' })
  imageUrl: string | null;

  @Column({
    collation: 'utf8mb4_unicode_ci',
  })
  title: string;

  @Column({
    type: 'longtext',
    collation: 'utf8mb4_unicode_ci',
  })
  content: string;
}
