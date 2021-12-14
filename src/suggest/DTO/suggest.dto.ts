/* eslint-disable prettier/prettier */
import { IsString } from "class-validator";
import { Stage } from "../ENUM/stage.enum";


 export class SuggestDTO {

 @IsString({message:'name is required'})
 stage: Stage;

 quantity:number;
 itemId:string;

 itSupportId:string;

 serialNumber:string;
 assetNumber:string;
 fixedAssetDescription:string;

 location:string;
 

 
    }