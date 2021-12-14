/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import {
    Get,
    Post,
    Patch,
    Delete,
    Body,
    Param,
    HttpStatus,
    UseGuards,
    Request,
  } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ItemsService } from 'src/items/items.service';
import { SuggestDTO } from './DTO/suggest.dto';

import { SuggestService } from './suggest.service';

@Controller('suggest')
@UseGuards(AuthGuard('jwt'))
export class SuggestController {
constructor(private suggestService: SuggestService,private itemService:ItemsService) {}

      @Get()
      async showAllSuggest() {
        const Suggest =  await this.suggestService.showAll();
        return {
          statusCode: HttpStatus.OK,
          message: 'Users fetched successfully',
          Suggest
        };
      }

      @Post()
      async createSuggest (@Body() data: SuggestDTO,@Request() req) {
        
        const user= req.user;
        const {itemId}=data;
        const item= await this.itemService.read(itemId);

         const Suggest = await this.suggestService.create(data,user,item);
        return {
          statusCode: HttpStatus.OK,
          message: 'created successfully',
          Suggest
        };
      }

      @Get(':id')
      async readSuggest(@Param('id') id: string) {
        const data =  await this.suggestService.read(id);
        return {
          statusCode: HttpStatus.OK,
          message: ' fetched successfully',
          data,
        };
      }

      @Patch(':id')
      async updateSuggest(@Param('id') id: string, @Body() data: Partial<SuggestDTO>, @Request() deb) {
        const user=deb.user;
        const suggest=await this.suggestService.update(id, data,user);
        return {
          statusCode: HttpStatus.OK,
          message: ' updated successfully',
          suggest
        };
      }

      @Delete(':id')
      async deleteSuggest(@Param('id') id: string) {
        await this.suggestService.destroy(id);
        return {
          statusCode: HttpStatus.OK,
          message: 'deleted successfully',
        };
      }
    }
