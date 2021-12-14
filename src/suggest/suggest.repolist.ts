/* eslint-disable prettier/prettier */
import { EntityRepository, Repository } from 'typeorm';
import { Suggest } from './suggest.entity';

@EntityRepository(Suggest)
export class SuggestRepository extends Repository<Suggest> {}
