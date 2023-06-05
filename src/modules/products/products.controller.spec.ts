import { Test, TestingModule } from '@nestjs/testing';

import { PrismaService } from '../core/prisma/prisma.service';
import { ProductController } from './products.controller';

describe('ProductController', () => {
  let controller: ProductController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [PrismaService],
    })
      .useMocker(() => {
        return {};
      })
      .compile();

    controller = module.get<ProductController>(ProductController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
