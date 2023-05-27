import { Prisma, PrismaClient } from '@prisma/client';

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  // create products
  const product1 = await prisma.product.upsert({
    where: { name: 'Milk' },
    update: {},
    create: {
      name: 'Milk',
      description: 'Good to drink it',
      disabled: false,
    },
  });

  const product2 = await prisma.product.upsert({
    where: { name: 'Chicken meat' },
    update: {},
    create: {
      name: 'Chicken meat',
      description: 'Good for meat-eaters',
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

  // create menus
  const menu1 = await prisma.menu.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      name: 'Breakfast',
      description: 'Menu for Breakfas (works 9:00 - 12:00)',
    },
  });

  // create menu lines
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

  // update menu
  await prisma.menu.update({
    where: { id: 1 },
    data: {
      categories: { set: [{ id: 1 }, { id: 2 }] },
    },
  });

  console.log({ product1, product2 });
  console.log({ category1, category2 });
  console.log({ menuLine1, menuLine2 });
  console.log({ menu1 });
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
