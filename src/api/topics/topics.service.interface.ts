import { Topic as TopicModel } from '@prisma/client';
import { TopicCreateDto } from './dto/topic-create.dto';

export interface AppTopicsService {
  createTopic: (dto: TopicCreateDto) => Promise<TopicModel | null>;
  getTopics: () => Promise<TopicModel[]>;
}
