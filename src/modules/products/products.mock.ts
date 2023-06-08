import { Product } from '@prisma/client';

export const mockedProducts: Product[] = [
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
