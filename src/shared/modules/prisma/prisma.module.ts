import { DynamicModule, Module } from '@nestjs/common';

import { createRepositoryProviders } from './inject-repository.decorator';

import {
  PRISMA_OPTIONS,
  PrismaModuleAsyncOptions,
  PrismaModuleOptions,
  createAsyncProviders,
  defaultPrismaOptions,
} from './prisma.providers';
import { PrismaRepository } from './prisma.repository';

@Module({})
export class PrismaModule {
  static register(options: PrismaModuleOptions): DynamicModule {
    const repositoryProviders = createRepositoryProviders();
    const value = { ...defaultPrismaOptions, ...options };

    return {
      global: true,
      module: PrismaModule,
      providers: [
        {
          provide: PRISMA_OPTIONS,
          useValue: value,
        },
        PrismaRepository,
        ...repositoryProviders,
      ],
      exports: [...repositoryProviders, PrismaRepository],
    };
  }

  static registerAsync(options: PrismaModuleAsyncOptions): DynamicModule {
    const repositoryProviders = createRepositoryProviders();
    return {
      global: true,
      module: PrismaModule,
      imports: options.imports || [],
      providers: [
        ...createAsyncProviders(options),
        ...repositoryProviders,
        PrismaRepository,
      ],
      exports: [...repositoryProviders, PrismaRepository],
    };
  }
}
