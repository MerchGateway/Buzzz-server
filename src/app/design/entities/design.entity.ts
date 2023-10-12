import {
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  OneToOne,
  Column,
  JoinColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { Product } from 'src/app/product/entities/product.entity';
import { User } from 'src/app/users/entities/user.entity';
import { ImageBody } from 'src/types/asset';
import { Timestamp } from '../../../database/timestamp.entity';

@Entity()
export class Design extends Timestamp {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Product, (product: Product) => product.design, {
    onUpdate: 'CASCADE',
  })
  product: Product;

  @ManyToOne(() => User, (user) => user.designs, {
    onDelete: 'CASCADE',
    eager: true,
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ default: false })
  published: boolean;

  //! TO-DO: Add a proper type for designData
  @Column({ name: 'design_data', type: 'simple-json' })
  designData: any;

  @Column({ type: 'simple-array', nullable: true })
  contributors: string[] | null;

  @Column({
    type: 'simple-json',
    nullable: true,
  })
  images: ImageBody[] | null;

  @Column({ type: 'simple-array', nullable: true })
  texts: string[] | null;

  @BeforeInsert()
  @BeforeUpdate()
  private async() {
    if (!this.contributors[0]) {
      this.user && this.contributors.push(this.user.email);
    }
  }
}
