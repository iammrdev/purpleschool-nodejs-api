import { PrismaClient } from '@prisma/client';
import { inject, injectable } from 'inversify';
import { Dependency } from '../config/config.dependency';
import { AppLogger } from '../common/lib/logger/logger.interface';

@injectable()
export class PrismaService {
  client: PrismaClient;

  constructor(@inject(Dependency.AppLogger) private logger: AppLogger) {
    this.client = new PrismaClient();
  }

  async connect(): Promise<void> {
    try {
      await this.client.$connect();
      this.logger.log('[PrismaService] Успешно подключились к базе данных');
    } catch (e) {
      if (e instanceof Error) {
        this.logger.error('[PrismaService] Ошибка подключения к базе данных: ' + e.message);
      }
    }
  }

  async disconnect(): Promise<void> {
    await this.client.$disconnect();
  }
}
