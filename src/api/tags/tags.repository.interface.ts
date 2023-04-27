import { Tag as TagModel } from '@prisma/client';
import { Tag } from './tags.entity';

export interface AppTagsRepository {
  create: (tag: Tag) => Promise<TagModel>;
  findByName: (name: string) => Promise<TagModel | null>;
  findAll: () => Promise<TagModel[]>;
}
