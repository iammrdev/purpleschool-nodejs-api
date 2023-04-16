import { inject, injectable } from 'inversify';
import { Topic as TopicModel } from '@prisma/client';
import { AppConfigService } from '../../config/config.service.interface';
import { Dependency } from '../../config/config.dependency';
import { TopicCreateDto } from './dto/topic-create.dto';
import { Topic } from './topics.entity';
import { AppTopicsService } from './topics.service.interface';
import { AppTopicsRepository } from './topics.repository.interface';

@injectable()
export class TopicsService implements AppTopicsService {
  constructor(
    @inject(Dependency.ConfigService) private configService: AppConfigService,
    @inject(Dependency.TopicsRepository) private topicsRepository: AppTopicsRepository,
  ) {}
  async createTopic({ name }: TopicCreateDto): Promise<TopicModel | null> {
    const existedTopic = await this.topicsRepository.findByName(name);

    if (existedTopic) {
      return null;
    }

    const newTopic = new Topic(name);

    return this.topicsRepository.create(newTopic);
  }

  async getTopics(): Promise<TopicModel[]> {
    return this.topicsRepository.findAll();
  }
}
