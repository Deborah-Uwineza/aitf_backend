/* eslint-disable prettier/prettier */
import * as bcrypt from 'bcrypt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersDTO } from './DTO/users.dto';
import {LoginDTO} from './DTO/login.dto';

import { UserRepository } from './user.repository';
import { JwtPayload } from 'src/user/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { Role } from './ENUM/role.enum';

@Injectable()
export class UserService {
    constructor(
        private userRepository:UserRepository,
        private jwtService:JwtService,

        
    ){}
    async showAll() {
        return await this.userRepository.find();
      }

      async create(data: UsersDTO) {

        const {department,email,location,names,phone,position,username,password,role}=data;

        const salt= await bcrypt.genSalt();
        const hashedPassword= await bcrypt.hash(password,salt);

        const user = this.userRepository.create({
          department,email,location,names,phone,position,username,password:hashedPassword,role
        });
        await this.userRepository.save(user);
        return user;
      }

      async findByEmail(email: string): Promise<UsersDTO> {
        return await this.userRepository.findOne({
          where: {
            email: email,
          },
        });
      }

      async read(id: string) {
        return await this.userRepository.findOne({ where: { id: id } });
      }

      // service Get all support user with IT  SUPPORT ROLE

      async supportUser() {
        return await this.userRepository.find({ where: { role: Role.IT_SUPPORT } });
      }

      async update(id: string , data: Partial<UsersDTO>) {
        const {department,email,location,names,phone,position,username,password,role}=data;
        const salt= await bcrypt.genSalt();
        const hashedPassword= await bcrypt.hash(password,salt);
        await this.userRepository.update({ id },{
          department,email,location,names,phone,position,username,password:hashedPassword,role}
        );
        return await this.userRepository.findOne({ id });
      }

      async destroy(id: string) {
        await this.userRepository.delete({ id });
        return { deleted: true };
      }

      async signIn(data: LoginDTO) {
        const { username, password } = data;
        const user = await this.userRepository.findOne({
          username,
          isActive: true,
        });
    
        if (user && (await bcrypt.compare(password, user.password))) {
          const username = user.username;
          const role = user.role;
          const payload: JwtPayload = {
            username,
            role,
          };
          const accessToken: string = await this.jwtService.sign(payload);
          if (accessToken) {
            user.lastLogin = new Date();
    
            await this.userRepository.update({ username }, user);
          }
          return { accessToken };
        } else {
          throw new UnauthorizedException('Please check your login credentials');
        }
      }
}
