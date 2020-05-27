import { DynamicModule, Module, Provider } from '@nestjs/common';
import { ModuleMetadata } from '@nestjs/common/interfaces';
import { LevelWithSilent, LoggerOptions } from 'pino';
import { LOGGER_LOG_LEVEL, LOGGER_OPTIONS, LOGGER_PRETTY_PRINT } from './logger.keys';
import { LoggerService } from './logger.service';

const defaultProviders: Provider[] = [
  ...getCommonProviders(),
  { provide: LOGGER_OPTIONS, useValue: Object.freeze({ logLevel: 'silent', prettyPrint: true }) }
];

@Module({
  providers: defaultProviders,
  exports: defaultProviders
})
export class LoggerModule {
  static forRootAsync(options: LoggerModuleAsyncOptions): DynamicModule {
    const providers = getCommonProviders();

    const imports = [...(options.imports ?? [])];

    if ('useExisting' in options) {
      providers.push({
        provide: LOGGER_OPTIONS,
        useExisting: options.useExisting
      });
    } else {
      providers.push({
        provide: LOGGER_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject
      });
    }

    return {
      module: LoggerModule,
      providers,
      imports,
      exports: providers
    };
  }

  static forRoot(options: LoggerOptions): DynamicModule {
    const providers: Provider[] = [
      ...getCommonProviders(),
      {
        provide: LOGGER_OPTIONS,
        useValue: { ...options }
      }
    ];

    return {
      module: LoggerModule,
      providers,
      exports: providers
    };
  }
}

export interface LoggerModuleOptions {
  logLevel?: LevelWithSilent;
  prettyPrint?: boolean;
}

export type LoggerModuleAsyncOptions = Pick<ModuleMetadata, 'imports'> &
  ({ useExisting: Provider } | { useFactory: (...args: any[]) => Promise<LoggerModuleOptions> | LoggerModuleOptions; inject?: any[] });

function getCommonProviders(): Provider[] {
  return [
    LoggerService,
    { provide: LOGGER_LOG_LEVEL, useFactory: (options: LoggerModuleOptions) => options.logLevel, inject: [LOGGER_OPTIONS] },
    { provide: LOGGER_PRETTY_PRINT, useFactory: (options: LoggerModuleOptions) => options.prettyPrint, inject: [LOGGER_OPTIONS] }
  ];
}
