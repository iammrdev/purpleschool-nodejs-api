import 'reflect-metadata';
import { Container, ContainerModule, interfaces } from 'inversify';
import { App } from './app';
import { AppExceptionFilter } from './common/errors/exception.filter.interface';
import { ExceptionFilter } from './common/errors/exception.filter';
import { AppLogger } from './common/lib/logger/logger.interface';
import { LoggerService } from './common/lib/logger/logger.service';
import { Dependency } from './config/config.dependency';
import { UsersController } from './api/users/users.controller';
import { ConfigService } from './config/config.service';
import { AppConfigService } from './config/config.service.interface';
import { PrismaService } from './database/prisma.service';
import { UsersService } from './api/users/users.service';
import { UsersRepository } from './api/users/users.repository';

type Bootstrap = {
  app: App;
  appContainer: Container;
};

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
  // libs
  bind<AppConfigService>(Dependency.ConfigService).to(ConfigService).inSingletonScope();
  bind<AppLogger>(Dependency.AppLogger).to(LoggerService).inSingletonScope();
  bind<AppExceptionFilter>(Dependency.AppExceptionFilter).to(ExceptionFilter);
  bind<PrismaService>(Dependency.PrismaService).to(PrismaService).inSingletonScope();

  // controllers
  bind<App>(Dependency.Application).to(App);
  bind<UsersController>(Dependency.UsersController).to(UsersController);
  bind<UsersService>(Dependency.UsersService).to(UsersService);
  bind<UsersRepository>(Dependency.UsersRepository).to(UsersRepository);
});

const bootstrap = (): Bootstrap => {
  const appContainer = new Container();
  appContainer.load(appBindings);

  const app = appContainer.get<App>(Dependency.Application);
  app.init();

  return { app, appContainer };
};

export const { app, appContainer } = bootstrap();