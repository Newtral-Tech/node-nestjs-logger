import { LoggerService } from '@newtral/nestjs-logger';
import { expect } from 'chai';

describe('LoggerService', () => {
  let loggerService: LoggerService;

  beforeEach(() => {
    loggerService = new LoggerService('silent', true);
  });

  describe('#getLogger()', () => {
    it('should get a logger from a module', () => {
      const logger = loggerService.getLogger(module);

      expect(logger.fatal).to.be.a('function');
      expect(logger.error).to.be.a('function');
      expect(logger.warn).to.be.a('function');
      expect(logger.info).to.be.a('function');
      expect(logger.debug).to.be.a('function');
    });

    it('should get a logger from a name', () => {
      const logger = loggerService.getLogger('test');

      expect(logger.fatal).to.be.a('function');
      expect(logger.error).to.be.a('function');
      expect(logger.warn).to.be.a('function');
      expect(logger.info).to.be.a('function');
      expect(logger.debug).to.be.a('function');
    });
  });
});
