import { inject, injectable } from 'inversify';
import { Tag as TagModel } from '@prisma/client';
import { Dependency } from '../../config/config.dependency';
import { Tag } from './tags.entity';
import { AppTagsRepository } from './tags.repository.interface';
import { PrismaService } from '../../database/prisma.service';

@injectable()
export class TagsRepository implements AppTagsRepository {
  constructor(@inject(Dependency.PrismaService) private prismaService: PrismaService) {}

  async create({ name }: Tag): Promise<TagModel> {
    return this.prismaService.client.tag.create({
      data: {
        name,
      },
    });
  }

  async findByName(name: string): Promise<TagModel | null> {
    return this.prismaService.client.tag.findFirst({
      where: {
        name,
      },
    });
  }

  async findAll(): Promise<TagModel[]> {
    return this.prismaService.client.tag.findMany();
  }
}
