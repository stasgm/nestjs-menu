import { Module } from '@nestjs/common';

import { AppConfig } from '../app-config';
import { PrismaService } from './prisma.service';

@Module({
  providers: [PrismaService, AppConfig],
  exports: [PrismaService],
})
export class PrismaModule {}
