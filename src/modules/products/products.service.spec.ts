import { Test, TestingModule } from '@nestjs/testing';

import { PrismaService } from '../core/prisma/prisma.service';
import { ProductService } from './products.service';

describe('ProductService', () => {
  let service: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductService, PrismaService],
    })
      .useMocker(() => {
        return {};
      })
      .compile();

    service = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
