import { IsString } from 'class-validator';

export class CityCreateDto {
  @IsString()
  name: string;
}
