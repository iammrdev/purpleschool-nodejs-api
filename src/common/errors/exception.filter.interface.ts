import { NextFunction, Request, Response } from 'express';

export interface AppExceptionFilter {
  catch(error: Error, req: Request, res: Response, next: NextFunction): void;
}
