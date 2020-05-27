import { Inject, Injectable } from '@nestjs/common';
import path from 'path';
import pino, { LevelWithSilent } from 'pino';
import { LOGGER_LOG_LEVEL, LOGGER_PRETTY_PRINT } from './logger.keys';
import { Logger } from './logger.types';

@Injectable()
export class LoggerService {
  private readonly logger = pino({ level: this.level, prettyPrint: this.prettyPrint, timestamp: pino.stdTimeFunctions.isoTime });

  constructor(
    @Inject(LOGGER_LOG_LEVEL) private readonly level: LevelWithSilent,
    @Inject(LOGGER_PRETTY_PRINT) private readonly prettyPrint: boolean = true
  ) {}

  /**
   * Create a new logger
   * @param moduleOrName - NodeJS module or name for the logger. When a module is given the name will be the module filename
   * @param level - Log level. By default the same level as the logger service instance but it could be overridden
   */
  getLogger(moduleOrName: NodeJS.Module | string, level = this.level): Logger {
    const loggerName = typeof moduleOrName === 'string' ? moduleOrName : this.getNameFromModule(moduleOrName);

    return this.logger.child({ name: loggerName, level });
  }

  private getNameFromModule({ filename }: NodeJS.Module) {
    const cwd = process.cwd();

    if (filename.startsWith(cwd)) {
      return path.normalize(filename).replace(cwd, '').split(path.sep).filter(Boolean).join(path.sep);
    }

    return filename;
  }
}
