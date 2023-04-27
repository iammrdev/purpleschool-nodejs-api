import { NextFunction, Request, Response } from 'express';

export interface AppUsersController {
  signin(_req: Request, _res: Response, next: NextFunction): void;
  signup(_req: Request, res: Response, _next: NextFunction): void;
}
