import { Response, Router } from 'express';
import { injectable } from 'inversify';
import { AppLogger } from './lib/logger/logger.interface';
import { ControllerRoute, ExpressReturnType } from './route.interface';

@injectable()
export abstract class BaseController {
  private readonly _router: Router;

  constructor(private loggerService: AppLogger) {
    this._router = Router();
  }

  get router(): Router {
    return this._router;
  }

  public send<T>(res: Response, code: number, message?: T): ExpressReturnType {
    return res.status(code).send(message);
  }

  public ok<T>(res: Response, message: T): ExpressReturnType {
    return this.send(res, 200, message);
  }

  public created(res: Response): ExpressReturnType {
    return res.sendStatus(201);
  }

  protected bindRoutes(routes: ControllerRoute[]): void {
    routes.forEach((route) => {
      this.loggerService.log(`[${route.method}] ${route.path}`);
      const middleware = route.middlewares?.map((middleware) =>
        middleware.execute.bind(middleware),
      );

      const handler = route.func.bind(this);
      const pipeline = middleware ? [...middleware, handler] : handler;
      this.router[route.method](route.path, pipeline);
    });
  }
}
