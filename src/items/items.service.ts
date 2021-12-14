/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { itemsDTO } from './DTO/items.dto';
import { ItemRepository } from './items.repository';


@Injectable()
export class ItemsService {
    constructor(
        private itemRepository: ItemRepository,
    ){}

    async showAll(){
        return await this.itemRepository.find({relations:['manager']});
    }
    

     async create(data: itemsDTO,user) {

      const {discription,image,name,status}=data;

        const items = this.itemRepository.create({
          discription,
          image,
          name,
          status,
          manager:user
          
        });
        await this.itemRepository.save(items);
        return items;
      }

    

      async read(id: string) {
        return await this.itemRepository.findOne({ where: { id: id }, relations:['manager'] });
      }

     
      

      async destroy(id: string) {
        await this.itemRepository.delete({ id });
        return { deleted: true };
      }

      async update(id: string, data: Partial<itemsDTO>) {
      await this.itemRepository.update({ id }, data);
        return await this.itemRepository.findOne({ id });
      }
      
    
}
