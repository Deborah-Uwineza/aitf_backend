/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { SuggestService } from './suggest.service';
import { SuggestController } from './suggest.controller';
import { SuggestRepository } from './suggest.repolist';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemsModule } from 'src/items/items.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [UserModule,ItemsModule,TypeOrmModule.forFeature([SuggestRepository])],
  providers: [SuggestService],
  controllers: [SuggestController]
})
export class SuggestModule {}
