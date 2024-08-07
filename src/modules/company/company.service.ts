import { Injectable } from '@nestjs/common';
import type { Prisma } from '@prisma/client';

import { InjectRepository, PrismaRepository } from '@shared/modules/prisma';

import { ListCompaniesDto } from './dto/list-companies.dto';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository('user')
    private readonly repository: PrismaRepository['company'],
  ) {}

  async list(data: ListCompaniesDto): Promise<void> {
    const filters: Prisma.CompanyWhereInput = {
      categories: { some: { id: data.categoryId } },
    };

    const qtyCompanies = await this.repository.count({ where: filters });
    const companies = await this.repository.findMany({
      where: filters,
      orderBy: {
        name: data.order,
      },
      skip: data.perPage * (data.page - 1),
    });
  }
}
