import {
  Inject,
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

import { PRISMA_OPTIONS, PrismaModuleOptions } from './prisma.providers';

/**
 * Prisma client as nest service.
 */
@Injectable()
export class PrismaRepository
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger();

  constructor(@Inject(PRISMA_OPTIONS) options: PrismaModuleOptions) {
    super({
      errorFormat: 'minimal',
      log: options.logQueries
        ? [
            {
              level: 'query',
              emit: 'event',
            },
          ]
        : undefined,
    });

    if (options.logQueries) {
      // eslint-disable-next-line import/no-extraneous-dependencies
      import('prisma-query-log')
        .then(({ createPrismaQueryEventHandler }) => {
          this.$on(
            'query' as never,
            createPrismaQueryEventHandler({
              logger: query => {
                this.logger.verbose(query, 'PrismaClient');
              },
              format: false,
              colorQuery: '\u001B[96m',
              colorParameter: '\u001B[90m',
            }),
          );
        })
        // eslint-disable-next-line no-console
        .catch(() => console.warn('prisma-query-log is missing.'));
    }
  }

  async onModuleInit(): Promise<void> {
    await this.$connect();
  }

  async onModuleDestroy(): Promise<void> {
    await this.$disconnect();
  }
}
