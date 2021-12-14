/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { SuggestDTO } from './DTO/suggest.dto';
import { Stage } from './ENUM/stage.enum';
import { SuggestRepository } from './suggest.repolist';

@Injectable()
export class SuggestService {
    constructor(
        private suggestRepository : SuggestRepository,
        private userService:UserService,
    ){}


      async showAll() {
        return await this.suggestRepository .find({relations:['item','request']});
      }

      async create(data: SuggestDTO,user,item) {
        const {quantity}=data;
        const suggest = this.suggestRepository .create({
          item:item,
          quantity,
          request:user
        });
        await this.suggestRepository.save(suggest);
        return suggest;
      }

      async read(id: string) {
        return await this.suggestRepository.findOne({ relations:['item','request'], where: { id: id } });
      }

      async update(id: string, data: Partial<SuggestDTO>, user) {
        const {stage,itSupportId,assetNumber,fixedAssetDescription,location,serialNumber}=data;

        const supporter= await this.userService.read(itSupportId);

        //ASSIGN REQUEST TO IT SUPPORT 
        if(stage === "IN_PROCESS"){

          await this.suggestRepository.update({ id }, {
            stage,
            support:supporter,


          });
          await this.suggestRepository.update({ id }, {

          });
          return await this.suggestRepository.findOne({ id });

        }
        if(stage === Stage.WAIT_APPROVE){

          await this.suggestRepository.update({ id }, {
            stage,
            assetNumber,
            serialNumber,
            fixedAssetDescription,
            location

          });
          await this.suggestRepository.update({ id }, {

          });
          return await this.suggestRepository.findOne({ id });
          
        }

        if(stage === Stage.APPROVE){

          await this.suggestRepository.update({ id }, {
            stage,
            manager:user,
            

          });
          await this.suggestRepository.update({ id }, {

          });
          return await this.suggestRepository.findOne({ id });
          
        }


        if(stage === Stage.RECEIVED){

          await this.suggestRepository.update({ id }, {
            stage,

            
          });
          await this.suggestRepository.update({ id }, {

          });
          return await this.suggestRepository.findOne({ id });
          
        }
       
      }

      async destroy(id: string) {
        await this.suggestRepository.delete({ id });
        return { deleted: true };
      }
    }

