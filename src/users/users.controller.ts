import { NextFunction, Request, Response } from "express";
import { BaseController } from "../common/base.controller.js";
import { HTTPError } from "../common/errors/http-error.js";
import { LoggerService } from "../common/lib/logger/logger.service.js";

export class UserController extends BaseController {
  constructor(logger: LoggerService) {
    super(logger);

    this.bindRoutes([
      { path: "/signup", method: "post", func: this.signup },
      { path: "/signin", method: "post", func: this.signin },
    ]);
  }

  signin(_req: Request, _res: Response, next: NextFunction) {
    next(new HTTPError(401, "Ошибка авторизации", "users/signin"));
  }

  signup(_req: Request, res: Response, _next: NextFunction) {
    this.ok(res, "signup");
  }
}
