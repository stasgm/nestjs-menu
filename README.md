# nestjs-menu

## Local development environment steps

1. create or update models in schema.prisma
2. run `npx prisma migrate dev` - to sync your Prisma schema with the database schema of your local development database.
3. run `npx prisma generate` - to generate typescipt types, based on the models.

## todo

- [ ] add for all controllers body validation
- [ ] handler errors if no database connection
- [ ] dockerize tests
- [ ] use .env for test enviroment. hardcoded ip issue
- [ ] add logging tool instead of console.log

## dev env

* dev-env:pretest:int - start a docker postgres db container and migrate dev database
  
## test env

* test-env:init - start docker postgres db container and init test database
  
