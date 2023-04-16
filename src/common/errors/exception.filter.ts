import { NextFunction, Request, Response } from 'express';
import { injectable, inject } from 'inversify';
import { Dependency } from '../../config/config.dependency';
import { AppLogger } from '../lib/logger/logger.interface';
import { AppExceptionFilter } from './exception.filter.interface';
import { HTTPError } from './http-error';

@injectable()
export class ExceptionFilter implements AppExceptionFilter {
  constructor(@inject(Dependency.AppLogger) private logger: AppLogger) {}

  catch(error: Error | HTTPError, _req: Request, res: Response, _next: NextFunction): void {
    if (error instanceof HTTPError) {
      this.logger.error(
        `${error.statusCode} ${error.message} ${error.context ? `[${error.context}]` : ''}`,
      );
      res.status(error.statusCode).send({ error: error.message });
      return;
    }

    this.logger.error(`${error.message}`);
    res.status(500).send({ error: error.message });
  }
}
