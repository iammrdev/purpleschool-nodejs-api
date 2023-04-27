import { NextFunction, Request, Response } from 'express';

export interface AppMiddleware {
  execute: (req: Request, res: Response, next: NextFunction) => void;
}
