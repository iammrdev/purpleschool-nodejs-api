import { App } from "./app.js";
import { ExceptionFilter } from "./common/errors/exception.filter.js";
import { LoggerService } from "./common/lib/logger/logger.service.js";
import { UserController } from "./users/users.controller.js";

const bootstrap = async () => {
  const logger = new LoggerService();

  const app = new App(
    logger,
    new UserController(logger),
    new ExceptionFilter(logger)
  );
  await app.init();
};

bootstrap();
