import { inject, injectable } from 'inversify';
import { Tag as TagModel } from '@prisma/client';
import { AppConfigService } from '../../config/config.service.interface';
import { Dependency } from '../../config/config.dependency';
import { TagCreateDto } from './dto/tag-create.dto';
import { Tag } from './tags.entity';
import { AppTagsService } from './tags.service.interface';
import { AppTagsRepository } from './tags.repository.interface';

@injectable()
export class TagsService implements AppTagsService {
  constructor(
    @inject(Dependency.ConfigService) private configService: AppConfigService,
    @inject(Dependency.TagsRepository) private tagsRepository: AppTagsRepository,
  ) {}
  async createTag({ name }: TagCreateDto): Promise<TagModel | null> {
    const existedTag = await this.tagsRepository.findByName(name);

    if (existedTag) {
      return null;
    }

    const newTag = new Tag(name);

    return this.tagsRepository.create(newTag);
  }

  async getTags(): Promise<TagModel[]> {
    return this.tagsRepository.findAll();
  }
}
