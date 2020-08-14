import { NoopLogger } from './logger.noop';
import { LoggerService } from './logger.service';
import { Logger } from './logger.types';

export class NoopLoggerService extends LoggerService {
  constructor() {
    super('silent', true);
  }

  getLogger(): Logger {
    return new NoopLogger();
  }
}
