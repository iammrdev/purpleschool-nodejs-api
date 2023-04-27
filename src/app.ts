import express, { Express, json } from 'express';
import { injectable, inject } from 'inversify';
import { Server } from 'http';
import { UsersController } from './api/users/users.controller';
import { AppLogger } from './common/lib/logger/logger.interface';
import { Dependency } from './config/config.dependency';
import { AppExceptionFilter } from './common/errors/exception.filter.interface';
import { AppConfigService } from './config/config.service.interface';
import { PrismaService } from './database/prisma.service';
import { AuthMiddleware } from './common/lib/validation/auth.middleware';
import { TopicsController } from './api/topics/topics.controller';
import { TagsController } from './api/tags/tags.controller';
import { CitiesController } from './api/cities/cities.controller';
import { OffersController } from './api/offers/offers.controller';

@injectable()
export class App {
  app: Express;
  server!: Server;
  port: number;

  constructor(
    @inject(Dependency.AppLogger) private logger: AppLogger,
    @inject(Dependency.UsersController) private usersController: UsersController,
    @inject(Dependency.AppExceptionFilter) private exceptionFilter: AppExceptionFilter,
    @inject(Dependency.ConfigService) private configService: AppConfigService,
    @inject(Dependency.PrismaService) private prismaService: PrismaService,
    @inject(Dependency.TopicsController) private topicsController: TopicsController,
    @inject(Dependency.TagsController) private tagsController: TagsController,
    @inject(Dependency.CitiesController) private citiesController: CitiesController,
    @inject(Dependency.OffersController) private offersController: OffersController,
  ) {
    this.app = express();
    this.port = 8000;
  }

  useMiddleware(): void {
    this.app.use(json());
    const authMiddleware = new AuthMiddleware(this.configService.get('SECRET'));

    this.app.use(authMiddleware.execute.bind(authMiddleware));
  }

  useRoutes(): void {
    // @question: версионирование api, как правильно делать?
    this.app.use('/users', this.usersController.router);
    this.app.use('/topics', this.topicsController.router);
    this.app.use('/tags', this.tagsController.router);
    this.app.use('/cities', this.citiesController.router);
    this.app.use('/offers', this.offersController.router);
  }

  useExceptionFilters(): void {
    this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
  }

  public async init(): Promise<void> {
    this.useMiddleware();
    this.useRoutes();
    this.useExceptionFilters();

    await this.prismaService.connect();
    this.server = this.app.listen(this.port);

    this.logger.log(`Server started on http://localhost:${this.port}`);
  }
}
