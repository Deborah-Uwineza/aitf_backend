/* eslint-disable prettier/prettier */
import { Controller, UseGuards } from '@nestjs/common';
import {

    Get,
    Post,
    Patch,
    Delete,
    Body,
    Param,
    HttpStatus,
  } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { UsersDTO } from './DTO/users.dto';

import { UserService } from './user.service';

@Controller('user')
 @UseGuards(AuthGuard('jwt'))
export class UserController {
    constructor(private userService: UserService) {}

  


    @Get()
    async showAllUsers() {
      const users =  await this.userService .showAll();
      return {
        statusCode: HttpStatus.OK,
        message: 'Users fetched successfully',
        users
      };
    }

// Contoller Get all support user with IT  SUPPORT ROLE
    
    @Get('/support')
    async showAllSupportUser() {
      const users =  await this.userService.supportUser();
      return {
        statusCode: HttpStatus.OK,
        message: 'Users support fetched successfully',
        users
      };
    }

    

    @Post()


    async createUsers(@Body() data: UsersDTO) {
       const user = await this.userService.create(data);
      return {
        statusCode: HttpStatus.OK,
        message: 'User created successfully',
        user
      };
    }

   
  

    @Get(':id')

    async readUser(@Param('id') id: string) {
      const data =  await this.userService.read(id);
      return {
        statusCode: HttpStatus.OK,
        message: 'User fetched successfully',
        data,
      };
    }


    @Patch(':id')

    async uppdateUser(@Param('id') id: string, @Body() data: Partial<UsersDTO>) {
      await this.userService.update(id, data);
      return {
        statusCode: HttpStatus.OK,
        message: 'User updated successfully',
      };
    }

    
    @Delete(':id')

    async deleteUser(@Param('id') id: string) {
      await this.userService.destroy(id);
      return {
        statusCode: HttpStatus.OK,
        message: 'User deleted successfully',
      };
    }
}
