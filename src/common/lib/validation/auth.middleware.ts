import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { AppMiddleware } from '../../middleware.interface';

export class AuthMiddleware implements AppMiddleware {
  constructor(private secret: string) {}

  execute(req: Request, _res: Response, next: NextFunction): void {
    if (!req.headers.authorization) {
      return next();
    }
    const [, token] = req.headers.authorization.split(' ');

    verify(token, this.secret, (err, payload) => {
      if (!err && typeof payload === 'object') {
        req.user = payload.email;
      }

      next();
    });
  }
}
