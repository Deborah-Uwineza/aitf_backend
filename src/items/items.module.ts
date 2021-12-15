/* eslint-disable prettier/prettier */
// eslint-disable-next-line prettier/prettier
import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';

import { ItemRepository } from './items.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';

@Module({
  imports: [CloudinaryModule,TypeOrmModule.forFeature([ItemRepository])],
  providers: [ItemsService],
  // exports: [ItemRepository],
  controllers: [ItemsController],
  exports:[ItemsService],
})
export class ItemsModule {}
