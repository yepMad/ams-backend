import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PrismaModule } from '@shared/modules/prisma';
import { CompanyModule } from '@modules/company/company.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule.register({ logQueries: false }),
    CompanyModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
