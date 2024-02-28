import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Timestamp } from '../../../database/timestamp.entity';

@Entity()
export class Blog extends Timestamp {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true, name: 'image_url' })
  imageUrl: string | null;

  @Column()
  title: string;

  @Column({ type: 'longtext' })
  content: string;
}
