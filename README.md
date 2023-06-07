# nestjs-test-1

## Local development environment (Feature branch) steps

1. create or update models in schema.prisma
2. run `npx prisma migrate dev` - to sync your Prisma schema with the database schema of your local development database.
3. run `npx prisma generate` - to generate typescipt types, based on the models.

## todo

* body validation
  