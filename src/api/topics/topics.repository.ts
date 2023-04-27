import { inject, injectable } from 'inversify';
import { Topic as TopicModel } from '@prisma/client';
import { Dependency } from '../../config/config.dependency';
import { Topic } from './topics.entity';
import { AppTopicsRepository } from './topics.repository.interface';
import { PrismaService } from '../../database/prisma.service';

@injectable()
export class TopicsRepository implements AppTopicsRepository {
  constructor(@inject(Dependency.PrismaService) private prismaService: PrismaService) {}

  async create({ name }: Topic): Promise<TopicModel> {
    return this.prismaService.client.topic.create({
      data: {
        name,
      },
    });
  }

  async findByName(name: string): Promise<TopicModel | null> {
    return this.prismaService.client.topic.findFirst({
      where: {
        name,
      },
    });
  }

  async findAll(): Promise<TopicModel[]> {
    return this.prismaService.client.topic.findMany();
  }
}
