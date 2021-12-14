/* eslint-disable prettier/prettier */
import { Controller, HttpStatus } from '@nestjs/common';
import {

    Post,
    Body,
  } from '@nestjs/common';
import { LoginDTO } from './DTO/login.dto';

import { UserService } from './user.service';

@Controller('auth')
export class LoginController {
    constructor(private userService: UserService) {}

    @Post('/login')
    async signIn(@Body() data: LoginDTO) {
        // console.log(data)
      const payload = await this.userService.signIn(data);
      return {
        statusCode: HttpStatus.OK,
        message: 'Your login was accepted',
        payload: payload,
      };
    }

}
