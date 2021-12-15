/* eslint-disable prettier/prettier */
import {
    Post,
    Delete,
    Body,
    Param,
    Patch,
    UseGuards,
    Request,
    UseInterceptors,
    UploadedFile,
    } from '@nestjs/common';
import { Controller, Get, HttpStatus } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';

import { itemsDTO } from './DTO/items.dto';
import { ItemsService } from './items.service';

@Controller('items')
@UseGuards(AuthGuard('jwt'))
export class ItemsController {
    constructor(
        private itemsService:ItemsService,
        
    ){}
    @Get()
    async showAllItems(){
        const items = await this.itemsService.showAll();
        return{
         statusCode:HttpStatus.OK,
         message:'successful',
         items
        };
    }
        
    @Post()
      async createItems(@Body() data: itemsDTO,@Request() req) {
        const user=req.user;
         const Items = await this.itemsService .create(data,user);
        return {
          statusCode: HttpStatus.OK,
          message: 'created successfully',
          Items
        };
      }

      @Get(':id')
      async readItem(@Param('id') id: string) {
        const data =  await this.itemsService.read(id);
        return {
          statusCode: HttpStatus.OK,
          message: 'fetched successfully',
          data,
        };
      }

      @Patch(':id')
      async uppdateItem(@Param('id') id: string, @Body() data: Partial<itemsDTO>) {
        await this.itemsService.update(id, data);
        return {
          statusCode: HttpStatus.OK,
          message: ' updated successfully',
        };
      }

      @Delete(':id')
      async deleteItem(@Param('id') id: string) {
        await this.itemsService.destroy(id);
        return {
          statusCode: HttpStatus.OK,
          message: 'deleted successfully',
        };
      }

      @Post('uploadImage/:id')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: string,
  ) {
    const picture = await this.itemsService.uploadImageToCloudinary(
      file,
      id,
    );
    return {
      statusCode: HttpStatus.OK,
      message: 'Imanage added successfully',
      payload: picture,
    };
  }

}
