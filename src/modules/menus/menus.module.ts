import { Module } from '@nestjs/common';

import { PrismaModule } from '../core/prisma/prisma.module';
import { MenusController } from './menus.controller';
import { MenuRepository } from './menus.repository';
import { MenusService } from './menus.service';
import { MenuExistsRule } from './validation-rules/menu-exists.rule';

@Module({
  controllers: [MenusController],
  providers: [MenusService, MenuRepository, MenuExistsRule],
  imports: [PrismaModule],
})
export class MenusModule {}
