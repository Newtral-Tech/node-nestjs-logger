import { Logger as PinoLogger } from 'pino';

export interface Logger extends Pick<PinoLogger, 'fatal' | 'error' | 'warn' | 'info' | 'debug'> {
  fatal(msg: string, ...args: any[]): void;

  fatal(obj: object, msg?: string, ...args: any[]): void;

  error(msg: string, ...args: any[]): void;

  error(obj: object, msg?: string, ...args: any[]): void;

  warn(msg: string, ...args: any[]): void;

  warn(obj: object, msg?: string, ...args: any[]): void;

  info(msg: string, ...args: any[]): void;

  info(obj: object, msg?: string, ...args: any[]): void;

  debug(msg: string, ...args: any[]): void;

  debug(obj: object, msg?: string, ...args: any[]): void;
}
