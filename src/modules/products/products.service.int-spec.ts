import { Test } from '@nestjs/testing';
import { AppModule } from 'src/app.module';

// import { PrismaService } from '../core/prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductsService } from './products.service';

describe('ProductsService Int', () => {
  // let prisma: PrismaService;
  let productsService: ProductsService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    // prisma = moduleRef.get(PrismaService);
    productsService = moduleRef.get(ProductsService);
    // await prisma.cleanDatabase();
  });

  const createProductDto: CreateProductDto = {
    name: 'New Product2',
    description: 'new test product',
    disabled: false,
  };

  describe('createProduct', () => {
    it('should create product', async () => {
      const product = await productsService.create(createProductDto);
      expect(product.name).toBe(createProductDto.name);
    });

    it('should throw on duplicate name', async () => {
      await expect(productsService.create(createProductDto)).rejects.toMatchObject({ code: 'P2002' });
      // ;
      // a.toContainEqual({ code: 'P2002' });
    });
  });
});
