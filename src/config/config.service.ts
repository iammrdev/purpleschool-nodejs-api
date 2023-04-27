import { config, DotenvConfigOutput, DotenvParseOutput } from 'dotenv';
import { inject, injectable } from 'inversify';
import { Dependency } from './config.dependency';
import { AppConfigService } from './config.service.interface';
import { AppLogger } from '../common/lib/logger/logger.interface';

@injectable()
export class ConfigService implements AppConfigService {
  private config: DotenvParseOutput;

  constructor(@inject(Dependency.AppLogger) private logger: AppLogger) {
    const result: DotenvConfigOutput = config();

    if (result.error) {
      this.logger.error('[ConfigService] Не удалось прочитать файл .env или он отсутствует');
    } else {
      this.logger.log('[ConfigService] Конфигурация .env загружена');
      this.config = result.parsed as DotenvParseOutput;
    }
  }

  get(key: string): string {
    return this.config[key];
  }
}
