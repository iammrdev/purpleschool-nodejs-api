import { Request, Response, NextFunction, Router } from 'express';
import { AppMiddleware } from './middleware.interface';

export interface ControllerRoute {
  path: string;
  func: (req: Request, res: Response, next: NextFunction) => void;
  method: keyof Pick<Router, 'get' | 'post' | 'delete' | 'patch' | 'put'>;
  middlewares?: AppMiddleware[];
}

export type ExpressReturnType = Response<any, Record<string, any>>;
