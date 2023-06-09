import {
  BaseEntity,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  OneToOne,
  BeforeInsert,
  BeforeUpdate,
  Column,
  JoinColumn,
} from 'typeorm';
import { Product } from 'src/app/product/product.entity';
import { User } from 'src/app/users/entities/user.entity';
import { CloudinaryProvider } from 'src/providers/cloudinary.provider';
import { ImageBody } from 'src/types/asset';
import { IMAGE_TYPE, TEXT_TYPE } from 'src/constant';

@Entity('design')
export class Design extends BaseEntity {
  imageStorage: CloudinaryProvider;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Product, (product: Product) => product.design, {
    onDelete: 'CASCADE',
  })
  product: Product;

  @ManyToOne(() => User, (user) => user.designs, {
    onDelete: 'CASCADE',
    eager: true,
  })
  @JoinColumn()
  owner: User;

  @Column({ type: 'bool', default: false })
  published: boolean;

  @Column({ type: 'simple-json' })
  design_data: any;

  @Column('simple-array', { nullable: true })
  images: ImageBody[];

  @Column('simple-array', { nullable: true })
  texts: string[];

  @BeforeInsert()
  @BeforeUpdate()
  private async sortDesignAssets(): Promise<void> {
    if (this.design_data) {
      // refresh design to align with updated design
      this.texts.length = 0;

      // delete old images from cloudinary

      await this.imageStorage.deletePhotosByPrefix(this.owner.username);

      // save updated assets
      this.design_data.objects.map(async (object: any) => {
        if (object.type === TEXT_TYPE) {
          this.texts.push(object.text);
        } else if (object.type === IMAGE_TYPE) {
          const image = await this.imageStorage.uploadPhoto(object.src, {
            asset_folder: this.owner.username,
            prefix: this.owner.username,
          });
          this.images.push({ public_id: image.public_id, url: image.url });
          // update image scr from design with online link  to be saved
          object.src = image.url;
        } else {
          console.log('other type of asset');
        }
      });
    }
  }

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
