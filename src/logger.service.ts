import { Inject, Injectable } from '@nestjs/common';
import path from 'path';
import pino from 'pino';
import { LOGGER_LOG_LEVEL, LOGGER_PRETTY_PRINT } from './logger.keys';
import { Logger } from './logger.types';

@Injectable()
export class LoggerService {
  private readonly logger: pino.Logger;

  constructor(
    @Inject(LOGGER_LOG_LEVEL) private readonly level: pino.LevelWithSilent,
    @Inject(LOGGER_PRETTY_PRINT) private readonly prettyPrint: boolean = true
  ) {
    if (this.prettyPrint) {
      const transport = pino.transport({
        target: 'pino-pretty',
        options: { destination: 1, level: this.level, colorize: true, translateTime: 'yyyy-mm-dd"T"HH:MM:ss.l"Z"' }
      });

      this.logger = pino(transport);
    } else {
      this.logger = pino({ level: this.level, timestamp: pino.stdTimeFunctions.isoTime });
    }
  }

  /**
   * Create a new logger
   * @param moduleOrName - NodeJS module or name for the logger. When a module is given the name will be the module filename
   * @param level - Log level. By default the same level as the logger service instance but it could be overridden
   */
  getLogger(moduleOrName: NodeJS.Module | string, level = this.level): Logger {
    const loggerName = typeof moduleOrName === 'string' ? moduleOrName : this.getNameFromModule(moduleOrName);

    return this.logger.child({ name: loggerName }, { level });
  }

  private getNameFromModule({ filename }: NodeJS.Module) {
    const cwd = process.cwd();

    if (filename.startsWith(cwd)) {
      return path.normalize(filename).replace(cwd, '').split(path.sep).filter(Boolean).join(path.sep);
    }

    return filename;
  }
}
