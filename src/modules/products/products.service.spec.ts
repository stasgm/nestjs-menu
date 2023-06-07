import { Test, TestingModule } from '@nestjs/testing';

import { PrismaService } from '../core/prisma/prisma.service';
import { ProductsService } from './products.service';

describe('ProductService', () => {
  let service: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsService, PrismaService],
    })
      .useMocker(() => {
        return {};
      })
      .compile();

    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
