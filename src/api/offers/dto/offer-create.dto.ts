import { IsArray, IsDateString, IsInt, IsString } from 'class-validator';

export class OfferCreateDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  url: string;

  @IsDateString()
  startAt: Date;

  @IsDateString()
  endAt: Date;

  @IsInt()
  cityId: number;

  @IsInt()
  topicId: number;

  @IsArray()
  public tags: number[];
}
