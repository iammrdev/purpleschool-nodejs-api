import { NextFunction, Request, Response } from 'express';
import { injectable, inject } from 'inversify';
import { BaseController } from '../../common/base.controller';
import { HTTPError } from '../../common/errors/http-error';
import { AppLogger } from '../../common/lib/logger/logger.interface';
import { Dependency } from '../../config/config.dependency';
import { AppTagsController } from './tags.controller.interface';
import { AppTagsService } from './tags.service.interface';
import { TagCreateDto } from './dto/tag-create.dto';
import { ValidateMiddleware } from '../../common/lib/validation/validate.middleware';

@injectable()
export class TagsController extends BaseController implements AppTagsController {
  constructor(
    @inject(Dependency.AppLogger) private logger: AppLogger,
    @inject(Dependency.TagsService) private tagsService: AppTagsService,
  ) {
    super(logger);

    this.bindRoutes([
      {
        path: '/',
        method: 'post',
        func: this.create,
        middlewares: [new ValidateMiddleware(TagCreateDto)],
      },
      { path: '/', method: 'get', func: this.getAll },
    ]);
  }

  public async create(
    { body }: Request<{}, {}, TagCreateDto>,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const result = await this.tagsService.createTag(body);

    if (!result) {
      return next(new HTTPError(422, 'Такой тэг уже существует'));
    }

    this.ok(res, { id: result.id, name: result.name });
  }

  public async getAll(_req: Request, res: Response, _next: NextFunction): Promise<void> {
    const tags = await this.tagsService.getTags();

    this.ok(res, tags);
  }
}
