import { PrismaClient } from '@prisma/client';

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  // create products
  const product1 = await prisma.product.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      name: 'Milk',
      description: 'Good to drink it',
      disabled: false,
    },
  });

  const product2 = await prisma.product.upsert({
    where: { id: 2 },
    update: {},
    create: {
      id: 2,
      name: 'Chicken meat',
      description: 'Good for meat-eaters',
    },
  });

  const product3 = await prisma.product.upsert({
    where: { id: 3 },
    update: {},
    create: {
      id: 3,
      name: 'Tea',
      description: 'Good for your body',
    },
  });

  const product4 = await prisma.product.upsert({
    where: { id: 4 },
    update: {},
    create: {
      id: 4,
      name: 'Cofee',
      description: 'Best for your soul',
    },
  });

  // create menu categories

  const category1 = await prisma.menuCategory.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      name: 'Vegan',
    },
  });

  const category2 = await prisma.menuCategory.upsert({
    where: { id: 2 },
    update: {},
    create: {
      id: 2,
      name: 'Healthy',
    },
  });

  const category3 = await prisma.menuCategory.upsert({
    where: { id: 3 },
    update: {},
    create: {
      id: 2,
      name: 'Drinks',
    },
  });

  // create menu 1
  const menu1 = await prisma.menu.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      name: 'Breakfast',
      description: 'Menu for Breakfast (works 9:00 - 12:00)',
    },
  });

  // create menu 1 lines
  const menuLine1 = await prisma.menuLine.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      menuId: 1,
      productId: 1,
      price: 100,
    },
  });

  const menuLine2 = await prisma.menuLine.upsert({
    where: { id: 2 },
    update: {},
    create: {
      id: 2,
      menuId: 1,
      productId: 2,
      price: 150,
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
  const menu2 = await prisma.menu.upsert({
    where: { id: 2 },
    update: {},
    create: {
      id: 2,
      name: 'Drinks and beverages',
      description: 'All time',
    },
  });

  // create menu 2 lines
  const menuLine3 = await prisma.menuLine.upsert({
    where: { id: 3 },
    update: {},
    create: {
      id: 3,
      menuId: 2,
      productId: 3,
      price: 150,
    },
  });

  const menuLine4 = await prisma.menuLine.upsert({
    where: { id: 4 },
    update: {},
    create: {
      id: 4,
      menuId: 2,
      productId: 4,
      price: 250,
    },
  });

  // update menu 2
  await prisma.menu.update({
    where: { id: 2 },
    data: {
      categories: { set: [{ id: 3 }] },
    },
  });

  console.log({ product1, product2, product3, product4 });
  console.log({ category1, category2, category3 });
  console.log({ menuLine1, menuLine2, menuLine3, menuLine4 });
  console.log({ menu1, menu2 });
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
