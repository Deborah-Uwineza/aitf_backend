/* eslint-disable prettier/prettier */
import { Items } from 'src/items/items.entity';
import { User } from 'src/user/user.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Stage } from './ENUM/stage.enum';
@Entity()
export class Suggest {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({type:'enum', enum:Stage, default:Stage.PENDING})
  stage: Stage;

  @Column()
  quantity:number;

  @Column({nullable:true})
  serialNumber:string;

  @Column({nullable:true})
  assetNumber:string;

  @Column({type:'text', nullable:true})
  fixedAssetDescription:string;

  @Column({nullable:true})
  location:string;

  @ManyToOne(() => Items, item => item.suggests)
    item: Items;
  @ManyToOne(() => User, user => user.suggests)
  request: User;

  @ManyToOne(() => User, user => user.suggestsM)
  manager: User;

  @ManyToOne(() => User, user => user.suggestsS)
  support: User;

  @CreateDateColumn()
   createdAt:Date;

   @UpdateDateColumn()
   updatedAt:Date
}
