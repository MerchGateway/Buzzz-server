import {
    Entity,
    Column,
    BaseEntity,
    CreateDateColumn,
    ManyToOne,
    OneToOne,
    JoinColumn,
    UpdateDateColumn,
    PrimaryGeneratedColumn,
    // BeforeInsert,
    OneToMany,
    // TableColumn,
  } from 'typeorm';
  
  import { User } from '../../users/entities/user.entity';
  

  
  @Entity('2fa')
  export class TwoFactorAuth extends BaseEntity {
  
    constructor() {
      super();
      
    }
  
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @ManyToOne(() => User, {
      cascade: true
    })
    @JoinColumn({ name: 'user_id' })
    user: User;

  
    @Column({ name:'2fa_secret', type: 'varchar',select:false })
    secret:string


    @Column({ name:'2fa_uri',type: 'varchar',nullable:true })
    twofactorUri:string
    
    @Column({name:'2fa_uri', type: 'varchar',nullable:true })
    twofactorQrCode:string
  
    @CreateDateColumn()
    created_at: Date;
  

    @UpdateDateColumn()
    updated_at: Date;
  
  }
  