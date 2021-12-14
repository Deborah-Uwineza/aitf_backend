/* eslint-disable prettier/prettier */
// eslint-disable-next-line prettier/prettier
import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';

import { ItemRepository } from './items.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ItemRepository])],
  providers: [ItemsService],
  // exports: [ItemRepository],
  controllers: [ItemsController],
  exports:[ItemsService],
})
export class ItemsModule {}
