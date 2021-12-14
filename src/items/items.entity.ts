/* eslint-disable prettier/prettier */
import { Suggest } from 'src/suggest/suggest.entity';
import { User } from 'src/user/user.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Items {

  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ unique: true ,nullable:false})
  name: string;
  @Column()
  discription: string;
  @Column()
  status: string;
  @Column()
  image: string;

  @OneToMany(() => Suggest, suggest => suggest.item)
    suggests: Suggest[];

    @ManyToOne(() => User, user => user.items)
    manager: User;

  @CreateDateColumn()
  joinDate:Date;

  @UpdateDateColumn()
  updatedAt:Date
 }
