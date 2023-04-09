import express, { Express } from "express";
import { Server } from "http";
import { ExceptionFilter } from "./common/errors/exception.filter.js";
import { LoggerService } from "./common/lib/logger/logger.service.js";
import { UserController } from "./users/users.controller.js";

export class App {
  app: Express;
  server!: Server;
  port: number;
  logger: LoggerService;
  userController: UserController;
  exceptionFilter: ExceptionFilter;

  constructor(
    logger: LoggerService,
    userController: UserController,
    exceptionFilter: ExceptionFilter
  ) {
    this.app = express();
    this.port = 8000;
    this.logger = logger;
    this.userController = userController;
    this.exceptionFilter = exceptionFilter;
  }

  useRoutes() {
    this.app.use("/users", this.userController.router);
  }

  useExceptionFilters() {
    this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
  }

  public async init() {
    this.useRoutes();
    this.useExceptionFilters();

    this.server = this.app.listen(this.port);

    this.logger.log(`Server started on http://localhost:${this.port}`);
  }
}
