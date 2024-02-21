import { LoggerService } from '@nestjs/common';

import { logger } from '../../common/logger/logger';

export class NestLogger implements LoggerService {
  log(message: string): void {
    logger.info(message, {
      module: 'nestjs',
    });
  }
  error(message: string, trace: string): void {
    // eslint-disable-line @typescript-eslint/no-unused-vars
    // Handle by nestFormatterError in app module
  }
  warn(message: string): void {
    logger.warn(message, {
      module: 'nestjs',
    });
  }
  debug(message: string): void {
    logger.debug(message, {
      module: 'nestjs',
    });
  }
  verbose(message: string): void {
    logger.verbose(message, {
      module: 'nestjs',
    });
  }
}
