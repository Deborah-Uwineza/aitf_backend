/* eslint-disable prettier/prettier */

import { IsString } from "class-validator";
import { DepartmentEnum } from "../ENUM/department.enum";
import { Role } from "../ENUM/role.enum";

export class UsersDTO {
  @IsString({message:'name is required'})
  username: string;
  
  names: string;
 
  email: string;

  phone: string;
 
  department: DepartmentEnum;

  location: string;
  
  position: string;

  role:Role;

  password:string;
  
 
 
    }