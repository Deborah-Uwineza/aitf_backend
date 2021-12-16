/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable } from '@nestjs/common';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { ImageDTO } from './DTO/image.dto';
import { itemsDTO } from './DTO/items.dto';
import { ItemRepository } from './items.repository';


@Injectable()
export class ItemsService {
    constructor(
        private itemRepository: ItemRepository,
        private cloudinary: CloudinaryService,

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

      async updateImage(data: ImageDTO): Promise<ImageDTO> {
        const { id, image } = data;
        const item = await this.read(id);
    
    
        item.image = image;
    
        await this.itemRepository.save(item);
    
        return item;
      }

      
  async uploadImageToCloudinary(file: Express.Multer.File, id: string) {
    const picture = await this.cloudinary.uploadImage(file).catch(() => {
      throw new BadRequestException('Invalid file type.');
    });
    const data = {
      id: id,
      image: picture.secure_url,
    };
    console.log(data);

    await this.updateImage(data);

    return picture;
  }
      
    
}
