import { NextFunction, Request, Response } from 'express';
import { injectable, inject } from 'inversify';
import { BaseController } from '../../common/base.controller';
import { HTTPError } from '../../common/errors/http-error';
import { AppLogger } from '../../common/lib/logger/logger.interface';
import { Dependency } from '../../config/config.dependency';
import { AppTopicsController } from './topics.controller.interface';
import { AppTopicsService } from './topics.service.interface';
import { TopicCreateDto } from './dto/topic-create.dto';
import { ValidateMiddleware } from '../../common/lib/validation/validate.middleware';

@injectable()
export class TopicsController extends BaseController implements AppTopicsController {
  constructor(
    @inject(Dependency.AppLogger) private logger: AppLogger,
    @inject(Dependency.TopicsService) private topicsService: AppTopicsService,
  ) {
    super(logger);

    this.bindRoutes([
      {
        path: '/',
        method: 'post',
        func: this.create,
        middlewares: [new ValidateMiddleware(TopicCreateDto)],
      },
      { path: '/', method: 'get', func: this.getAll },
    ]);
  }

  public async create(
    { body }: Request<{}, {}, TopicCreateDto>,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const result = await this.topicsService.createTopic(body);

    if (!result) {
      return next(new HTTPError(422, 'Такой топик уже существует'));
    }

    this.ok(res, { id: result.id, name: result.name });
  }

  public async getAll(_req: Request, res: Response, _next: NextFunction): Promise<void> {
    const topics = await this.topicsService.getTopics();

    this.ok(res, topics);
  }
}
