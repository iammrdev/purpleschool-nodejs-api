import { NextFunction, Request, Response } from 'express';

export interface AppOffersController {
  create(_req: Request, _res: Response, next: NextFunction): void;
  getById(_req: Request, res: Response, _next: NextFunction): void;
  getAll(_req: Request, res: Response, _next: NextFunction): void;
  updateById(_req: Request, res: Response, _next: NextFunction): void;
  deleteById(_req: Request, res: Response, _next: NextFunction): void;
}
