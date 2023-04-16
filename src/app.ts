import express, { Express, json } from 'express';
import { injectable, inject } from 'inversify';
import { Server } from 'http';
import { UsersController } from './users/users.controller';
import { AppLogger } from './common/lib/logger/logger.interface';
import { Dependency } from './config/config.dependency';
import { AppExceptionFilter } from './common/errors/exception.filter.interface';
import { AppConfigService } from './config/config.service.interface';
import { PrismaService } from './database/prisma.service';
import { AuthMiddleware } from './common/lib/validation/auth.middleware';

@injectable()
export class App {
  app: Express;
  server!: Server;
  port: number;

  constructor(
    @inject(Dependency.AppLogger) private logger: AppLogger,
    @inject(Dependency.UsersController) private userController: UsersController,
    @inject(Dependency.AppExceptionFilter) private exceptionFilter: AppExceptionFilter,
    @inject(Dependency.ConfigService) private configService: AppConfigService,
    @inject(Dependency.PrismaService) private prismaService: PrismaService,
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
    this.app.use('/users', this.userController.router);
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
