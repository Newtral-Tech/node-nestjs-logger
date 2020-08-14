import { Logger } from './logger.types';

const noop = (): void => undefined;

export class NoopLogger implements Logger {
  debug = noop;
  error = noop;
  fatal = noop;
  info = noop;
  warn = noop;
}
