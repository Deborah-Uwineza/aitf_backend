/* eslint-disable prettier/prettier */
import { EntityRepository, Repository } from 'typeorm';
import { Items } from './items.entity';

@EntityRepository(Items)
export class ItemRepository extends Repository<Items> {}
