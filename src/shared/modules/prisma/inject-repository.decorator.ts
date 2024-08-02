/* eslint-disable @typescript-eslint/no-explicit-any */
import { Inject } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

import { PrismaRepository } from './prisma.repository';

interface TestDelegate {
  findMany: (args: any) => any;
}

type PrismaRepositoryProvider = {
  provide: string;
  inject: (typeof PrismaRepository)[];
  useFactory: (prisma: PrismaRepository) => any;
};

type PrismaDelegateNames = keyof {
  [P in keyof PrismaClient as PrismaClient[P] extends TestDelegate
    ? P
    : never]: PrismaClient[P];
};

const prismaRepositories = new Set<PrismaDelegateNames>();

export function createRepositoryProviders(): PrismaRepositoryProvider[] {
  return [...prismaRepositories].map(name => {
    return {
      provide: `${name}PrismaRepository`,
      inject: [PrismaRepository],
      useFactory: (prisma: PrismaRepository) => prisma[name],
    };
  });
}

/**
 * Example:
 * @InjectRepository('user') repository: PrismaRepository['user'] or PrismaClient['user']
 */
export function InjectRepository(
  delegateName: PrismaDelegateNames,
): PropertyDecorator & ParameterDecorator {
  prismaRepositories.add(delegateName);
  return Inject(`${delegateName}PrismaRepository`);
}
