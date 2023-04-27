import { IsArray, IsDateString, IsInt, IsOptional, IsString } from 'class-validator';

export class OfferUpdateDto {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  url: string;

  @IsOptional()
  @IsDateString()
  startAt: Date;

  @IsOptional()
  @IsDateString()
  endAt: Date;

  @IsOptional()
  @IsInt()
  cityId: number;

  @IsOptional()
  @IsInt()
  topicId: number;

  @IsOptional()
  @IsArray()
  public tags: number[];
}
