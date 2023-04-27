import { injectable } from 'inversify';
import { Logger, ILogObj } from 'tslog';
import { AppLogger } from './logger.interface';

@injectable()
export class LoggerService implements AppLogger {
  public logger: Logger<ILogObj>;

  constructor() {
    this.logger = new Logger({
      prettyLogTemplate: '{{yyyy}}-{{mm}}-{{dd}} {{hh}}:{{MM}}:{{ss}}\t{{logLevelName}}\t',
      prettyLogTimeZone: 'local',
    });
  }

  log(...args: unknown[]): void {
    this.logger.info(...args);
  }

  error(...args: unknown[]): void {
    this.logger.error(...args);
  }

  warn(...args: unknown[]): void {
    this.logger.warn(...args);
  }
}
