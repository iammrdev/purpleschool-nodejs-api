import { Tag as TagModel } from '@prisma/client';
import { TagCreateDto } from './dto/tag-create.dto';

export interface AppTagsService {
  createTag: (dto: TagCreateDto) => Promise<TagModel | null>;
  getTags: () => Promise<TagModel[]>;
}
