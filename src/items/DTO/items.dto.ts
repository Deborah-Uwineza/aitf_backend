/* eslint-disable prettier/prettier */

import {  IsBoolean, IsString } from "class-validator";


 export class itemsDTO {

  @IsString({message:'name is required'})
  name: string;
  @IsString()
  discription: string;
  @IsBoolean()
  status: string;
  @IsString()
  image: string;
  
    }