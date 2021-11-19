import pino from 'pino';

export * from './logger.keys';
export * from './logger.module';
export * from './logger.service';
export * from './logger.types';
export * from './logger.noop';
export * from './logger.service.noop';

export type LevelWithSilent = pino.LevelWithSilent;
export type Level = pino.Level;
