import { Test, TestingModule } from '@nestjs/testing';
import { Product } from '@prisma/client';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsRepository } from './products.repository';
import { ProductsService } from './products.service';

const menuProductsMocked: Product[] = [
  {
    id: 1,
    name: 'Product 1',
    createdAt: new Date(),
    updatedAt: new Date(),
    disabled: false,
    description: 'Product 1 description',
  },
  {
    id: 2,
    name: 'Product 2',
    createdAt: new Date(),
    updatedAt: new Date(),
    disabled: false,
    description: 'Product 2 description',
  },
];

describe('ProductService', () => {
  let service: ProductsService;
  let repository: ProductsRepository;

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsService],
    })
      .useMocker((token) => {
        if (token === ProductsRepository) {
          return {
            getProduct: jest.fn().mockResolvedValue(menuProductsMocked[0]),
            getProducts: jest.fn().mockResolvedValue(menuProductsMocked),
            createProduct: jest.fn().mockResolvedValue(menuProductsMocked[0]),
            updateProduct: jest.fn().mockResolvedValue(menuProductsMocked[0]),
            deleteProduct: jest.fn().mockResolvedValue(menuProductsMocked[0]),
          };
        }
        return {};
      })
      .compile();

    service = module.get<ProductsService>(ProductsService);
    repository = module.get<ProductsRepository>(ProductsRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return the list of products', async () => {
    const products = await service.findAll();

    expect(repository.getProducts).toHaveBeenCalledTimes(1);
    expect(typeof products).toBe('object');
    expect(products.length).toEqual(menuProductsMocked.length);
    expect(products[0].id).toEqual(menuProductsMocked[0].id);
  });

  it('should find by id and return a product', async () => {
    const product = await service.findById(menuProductsMocked[0].id);

    expect(repository.getProduct).toHaveBeenCalledTimes(1);
    expect(typeof product).toBe('object');
    expect(product).toBeDefined();
    expect(product?.id).toEqual(menuProductsMocked[0].id);
  });

  it('should find by name and return a product', async () => {
    const product = await service.findByName(menuProductsMocked[0].name);

    expect(repository.getProduct).toHaveBeenCalledTimes(1);
    expect(typeof product).toBe('object');
    expect(product).toBeDefined();
    expect(product?.id).toEqual(menuProductsMocked[0].id);
  });

  it('should create and return a product', async () => {
    const createProductDto: CreateProductDto = {
      ...menuProductsMocked[0],
    };
    const product = await service.create(createProductDto);

    expect(repository.createProduct).toHaveBeenCalledTimes(1);
    expect(typeof product).toBe('object');
    expect(product).toBeDefined();
    expect(product?.id).toEqual(menuProductsMocked[0].id);
  });

  it('should update and return a product', async () => {
    const id = menuProductsMocked[0].id;
    const updateProductDto: UpdateProductDto = {
      ...menuProductsMocked[0],
    };
    const product = await service.update(id, updateProductDto);

    expect(repository.updateProduct).toHaveBeenCalledTimes(1);
    expect(typeof product).toBe('object');
    expect(product).toBeDefined();
    expect(product?.id).toEqual(id);
  });

  it('should remove and return one product', async () => {
    const product = await service.remove(menuProductsMocked[0].id);

    expect(repository.deleteProduct).toHaveBeenCalledTimes(1);
    expect(typeof product).toBe('object');
    expect(product).toBeDefined();
    expect(product?.id).toEqual(menuProductsMocked[0].id);
  });
});
