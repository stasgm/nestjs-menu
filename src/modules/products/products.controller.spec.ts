import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './products.controller';
import { ProductService } from './products.service';
import { PrismaService } from '../core/prisma/prisma.service';

describe('ProductController', () => {
  let controller: ProductController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [ProductService, PrismaService],
    }).compile();

    controller = module.get<ProductController>(ProductController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
