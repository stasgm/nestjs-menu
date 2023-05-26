import { PrismaClient } from '@prisma/client';

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  // create two dummy products
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

  console.log({ product1, product2 });
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
