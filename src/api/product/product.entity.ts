import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  // CreateDateColumn,
  // UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column({ default: false })
  isPublished: boolean;

  //   @CreateDateColumn({ type: 'timestamp without time zone', default: 'NOW()' })
  //   createdAt: Date;

  //   @UpdateDateColumn({
  //     type: 'timestamp without time zone',
  //     onUpdate: 'NOW()',
  //     nullable: true,
  //   })
  //   updatedAt: Date;
}
