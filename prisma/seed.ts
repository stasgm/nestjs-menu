// import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';

import { getPrismaDataSource } from '../src/modules/core/prisma/prisma.service';

// initialize Prisma Client
const prisma = new PrismaClient({ ...getPrismaDataSource() });

// function* makeRangeIterator(start = 0, end = Number.POSITIVE_INFINITY, step = 1) {
//   let iterationCount = 0;
//   for (let i = start; i < end; i += step) {
//     iterationCount++;
//     yield i;
//   }
//   return iterationCount;
// }

async function main() {
  // create products

  await prisma.menu.deleteMany();
  await prisma.menuCategory.deleteMany();
  await prisma.product.deleteMany();

  // const amountOfProducts = 20;

  // const products = Array.from({ length: amountOfProducts })
  //   .fill([])
  //   .map(() => faker.commerce.product());

  // const generator = makeRangeIterator(1);
  // for await (const product of new Set(products)) {
  //   const id = generator.next().value;

  //   await prisma.product.upsert({
  //     where: { id },
  //     update: {},
  //     create: {
  //       id: id,
  //       name: product,
  //       description: faker.commerce.productDescription(),
  //       disabled: false,
  //     },
  //   });
  // }

  await prisma.product.upsert({
    where: { id: 2 },
    update: {},
    create: {
      id: 2,
      name: 'Chicken meat',
      description: 'Good for meat-eaters',
    },
  });

  await prisma.product.upsert({
    where: { id: 3 },
    update: {},
    create: {
      id: 3,
      name: 'Tea',
      description: 'Good for your body',
    },
  });

  await prisma.product.upsert({
    where: { id: 4 },
    update: {},
    create: {
      id: 4,
      name: 'Cofee',
      description: 'Best for your soul',
    },
  });

  // create menu categories
  await prisma.menuCategory.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      name: 'Vegan',
    },
  });

  await prisma.menuCategory.upsert({
    where: { id: 2 },
    update: {},
    create: {
      id: 2,
      name: 'Healthy',
    },
  });

  await prisma.menuCategory.upsert({
    where: { id: 3 },
    update: {},
    create: {
      id: 3,
      name: 'Drinks',
    },
  });

  // create menu 1
  await prisma.menu.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      name: 'Breakfast',
      description: 'Menu for Breakfast (works 9:00 - 12:00)',
      lines: [
        {
          productId: 2,
          price: 150,
        },
        {
          productId: 1,
          price: 100,
        },
      ],
    },
  });

  // update menu 1
  await prisma.menu.update({
    where: { id: 1 },
    data: {
      categories: { set: [{ id: 1 }, { id: 2 }] },
    },
  });

  // create menu 2
  await prisma.menu.upsert({
    where: { id: 2 },
    update: {},
    create: {
      id: 2,
      name: 'Drinks and beverages',
      description: 'All the time',
      lines: [
        {
          productId: 1,
          price: 130,
        },
        {
          productId: 4,
          price: 120,
        },
        {
          productId: 3,
          price: 110,
        },
      ],
    },
  });

  // update menu 2
  await prisma.menu.update({
    where: { id: 2 },
    data: {
      categories: { set: [{ id: 3 }] },
    },
  });
}

// execute the main function
main()
  .catch((error) => {
    // eslint-disable-next-line no-console
    console.error(error);
    // eslint-disable-next-line unicorn/no-process-exit
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
