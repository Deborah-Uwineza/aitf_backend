/* eslint-disable prettier/prettier */
import { Items } from 'src/items/items.entity';
import { Suggest } from 'src/suggest/suggest.entity';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { DepartmentEnum } from './ENUM/department.enum';
import { Role } from './ENUM/role.enum';
//import { uuidv4 } from 'uuid';

@Entity()
export class User {

  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ unique: true })
  username: string;

  @Column()
  password:string;
  @Column()
  names: string;
  @Column()
  email: string;
  @Column()
  phone: string;
  @Column()
  location: string;
  @Column()
  position: string;

  @Column({default:true})
  isActive:boolean
  @Column({type:'enum', enum:Role})
  role: Role;

  @Column({type:'enum', enum:DepartmentEnum})
  department:DepartmentEnum;

  @OneToMany(() => Suggest, suggest => suggest.request)
  suggests: Suggest[];

  @OneToMany(() => Suggest, suggest => suggest.manager)
  suggestsM: Suggest[];

  @OneToMany(() => Suggest, suggest => suggest.support)
  suggestsS: Suggest[];

  @OneToMany(() => Items, item => item.manager)
  items: Items[];
  @Column( {nullable:true})
  lastLogin:Date

  @CreateDateColumn()
  joinDate:Date;

  @UpdateDateColumn()
  updatedAt:Date



}
