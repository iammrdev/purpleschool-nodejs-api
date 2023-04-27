import { NextFunction, Request, Response } from 'express';
import { AppMiddleware } from '../../middleware.interface';

export class AuthGuard implements AppMiddleware {
  execute(req: Request, res: Response, next: NextFunction): void {
    if (req.user) {
      return next();
    }

    res.status(401).send({ error: 'Вы не авторизованы' });
  }
}
