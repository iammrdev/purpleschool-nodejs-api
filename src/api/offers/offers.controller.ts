import { NextFunction, Request, Response } from 'express';
import { injectable, inject } from 'inversify';
import { BaseController } from '../../common/base.controller';
import { HTTPError } from '../../common/errors/http-error';
import { AppLogger } from '../../common/lib/logger/logger.interface';
import { Dependency } from '../../config/config.dependency';
import { AppOffersController } from './offers.controller.interface';
import { AppOffersService } from './offers.service.interface';
import { OfferCreateDto } from './dto/offer-create.dto';
import { ValidateMiddleware } from '../../common/lib/validation/validate.middleware';

@injectable()
export class OffersController extends BaseController implements AppOffersController {
  constructor(
    @inject(Dependency.AppLogger) private logger: AppLogger,
    @inject(Dependency.OffersService) private offersService: AppOffersService,
  ) {
    super(logger);

    this.bindRoutes([
      {
        path: '/',
        method: 'post',
        func: this.create,
        middlewares: [new ValidateMiddleware(OfferCreateDto)],
      },
      { path: '/', method: 'get', func: this.getAll },
      { path: '/:id', method: 'get', func: this.getById },
      { path: '/:id', method: 'patch', func: this.updateById },
      { path: '/:id', method: 'delete', func: this.deleteById },
    ]);
  }

  public async create(
    { body }: Request<{}, {}, OfferCreateDto>,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const result = await this.offersService.createOffer(body);

    if (!result) {
      return next(new HTTPError(422, 'Такая акция уже существует'));
    }

    this.created(res);
  }

  public async getAll(_req: Request, res: Response, _next: NextFunction): Promise<void> {
    const offers = await this.offersService.getOffers();

    this.ok(res, offers);
  }

  public async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    const offerId = Number(req.params.id);

    const offer = await this.offersService.getOfferById(offerId);

    if (!offer) {
      return next(new HTTPError(404, 'Такой акции не существует'));
    }

    this.ok(res, offer);
  }

  public async updateById(req: Request, res: Response, next: NextFunction): Promise<void> {
    const offerId = Number(req.params.id);

    const offer = await this.offersService.getOfferById(offerId);

    if (!offer) {
      return next(new HTTPError(404, 'Такой акции не существует'));
    }

    const result = await this.offersService.updateOffer(offerId, req.body);

    this.ok(res, result);
  }

  public async deleteById(req: Request, res: Response, next: NextFunction): Promise<void> {
    const offerId = Number(req.params.id);

    // @question: где лучше делать проверку на то, что offer существует?
    // @question: что можно делать в контроллере? его зона ответственности?
    const offer = await this.offersService.getOfferById(offerId);

    if (!offer) {
      return next(new HTTPError(404, 'Такой акции не существует'));
    }

    await this.offersService.deleteOfferById(offerId);

    this.send(res, 204);
  }
}
