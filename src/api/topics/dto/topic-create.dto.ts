import { IsString } from 'class-validator';

export class TopicCreateDto {
  @IsString()
  name: string;
}
