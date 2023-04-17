import { NextFunction, Request, Response } from 'express';
import { injectable, inject } from 'inversify';
import { BaseController } from '../../common/base.controller';
import { HTTPError } from '../../common/errors/http-error';
import { AppLogger } from '../../common/lib/logger/logger.interface';
import { Dependency } from '../../config/config.dependency';
import { AppCitiesController } from './cities.controller.interface';
import { AppCitiesService } from './cities.service.interface';
import { CityCreateDto } from './dto/city-create.dto';
import { ValidateMiddleware } from '../../common/lib/validation/validate.middleware';

@injectable()
export class CitiesController extends BaseController implements AppCitiesController {
  constructor(
    @inject(Dependency.AppLogger) private logger: AppLogger,
    @inject(Dependency.CitiesService) private citiesService: AppCitiesService,
  ) {
    super(logger);

    this.bindRoutes([
      {
        path: '/',
        method: 'post',
        func: this.create,
        middlewares: [new ValidateMiddleware(CityCreateDto)],
      },
      { path: '/', method: 'get', func: this.getAll },
    ]);
  }

  public async create(
    { body }: Request<{}, {}, CityCreateDto>,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const result = await this.citiesService.createCity(body);

    if (!result) {
      return next(new HTTPError(422, 'Такой город уже существует'));
    }

    this.ok(res, { id: result.id, name: result.name });
  }

  public async getAll(_req: Request, res: Response, _next: NextFunction): Promise<void> {
    const cities = await this.citiesService.getCities();

    this.ok(res, cities);
  }
}
