import { Topic as TopicModel } from '@prisma/client';
import { Topic } from './topics.entity';

export interface AppTopicsRepository {
  create: (topic: Topic) => Promise<TopicModel>;
  findByName: (name: string) => Promise<TopicModel | null>;
  findAll: () => Promise<TopicModel[]>;
}
