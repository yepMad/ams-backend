import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PrismaModule } from '@shared/modules/prisma';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule.register({ logQueries: false }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
