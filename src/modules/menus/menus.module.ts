import { Module } from '@nestjs/common';

import { PrismaModule } from '../core/prisma/prisma.module';
import { MenusController } from './menus.controller';
import { MenuRepository } from './menus.repository';
import { MenusService } from './menus.service';
import { IsMenuNotExistRule, MenuExistsRule } from './validation-rules/';

@Module({
  controllers: [MenusController],
  providers: [MenusService, MenuRepository, MenuExistsRule, IsMenuNotExistRule],
  imports: [PrismaModule],
})
export class MenusModule {}
