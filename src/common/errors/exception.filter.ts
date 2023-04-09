import { NextFunction, Request, Response } from "express";
import { LoggerService } from "../lib/logger/logger.service.js";
import { IExceptionFilter } from "./exception.filter.interface.js";
import { HTTPError } from "./http-error.js";

export class ExceptionFilter implements IExceptionFilter {
  logger: LoggerService;

  constructor(logger: LoggerService) {
    this.logger = logger;
  }

  catch(
    error: Error | HTTPError,
    _req: Request,
    res: Response,
    _next: NextFunction
  ) {
    if (error instanceof HTTPError) {
      this.logger.error(
        `${error.statusCode} ${error.message} ${
          error.context ? `[${error.context}]` : ""
        }`
      );
      res.status(error.statusCode).send({ error: error.message });
      return;
    }

    this.logger.error(`${error.message}`);
    res.status(500).send({ error: error.message });
  }
}
