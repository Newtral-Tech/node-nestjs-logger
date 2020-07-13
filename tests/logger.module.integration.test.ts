import { Test, TestingModule } from '@nestjs/testing';
import { expect } from 'chai';
import { LoggerModule, LoggerService } from '../src';

describe('LoggerModule', () => {
  let loggerModule: TestingModule;

  beforeEach(async () => {
    loggerModule = await Test.createTestingModule({ imports: [LoggerModule] }).compile();
  });

  it('should export the LoggerService', async () => {
    const loggerService = await loggerModule.get(LoggerService);

    expect(loggerService).to.be.instanceOf(LoggerService);
  });
});
