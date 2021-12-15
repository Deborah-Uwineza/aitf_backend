import { IsString } from 'class-validator';

export class ImageDTO {
  @IsString({ message: 'organisation ID is required' })
  id: string;

  @IsString({ message: 'Logo is required' })
  image: string;
}
