import { NextFunction, Request, Response } from 'express';

export interface AppTagsController {
  create(_req: Request, _res: Response, next: NextFunction): void;
  getAll(_req: Request, res: Response, _next: NextFunction): void;
}
