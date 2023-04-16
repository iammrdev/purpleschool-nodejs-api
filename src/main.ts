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
import { TopicsController } from './api/topics/topics.controller';
import { TopicsService } from './api/topics/topics.service';
import { TopicsRepository } from './api/topics/topics.repository';
import { TagsController } from './api/tags/tags.controller';
import { TagsService } from './api/tags/tags.service';
import { TagsRepository } from './api/tags/tags.repository';
import { CitiesController } from './api/cities/cities.controller';
import { CitiesService } from './api/cities/cities.service';
import { CitiesRepository } from './api/cities/cities.repository';

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
  bind<TopicsController>(Dependency.TopicsController).to(TopicsController);
  bind<TopicsService>(Dependency.TopicsService).to(TopicsService);
  bind<TopicsRepository>(Dependency.TopicsRepository).to(TopicsRepository);
  bind<TagsController>(Dependency.TagsController).to(TagsController);
  bind<TagsService>(Dependency.TagsService).to(TagsService);
  bind<TagsRepository>(Dependency.TagsRepository).to(TagsRepository);
  bind<CitiesController>(Dependency.CitiesController).to(CitiesController);
  bind<CitiesService>(Dependency.CitiesService).to(CitiesService);
  bind<CitiesRepository>(Dependency.CitiesRepository).to(CitiesRepository);
});

const bootstrap = (): Bootstrap => {
  const appContainer = new Container();
  appContainer.load(appBindings);

  const app = appContainer.get<App>(Dependency.Application);
  app.init();

  return { app, appContainer };
};

export const { app, appContainer } = bootstrap();
