# test-server
Server that encapsulates testing features for flowbuild.

## Environment variables

Add a .env file with the following variables:

- KNEX_ENV (suggested value = docker)
- NODE_ENV (suggested value = docker)
- POSTGRES_USER (default = postgres)
- POSTGRES_PASSWORD (default = postgres)
- POSTGRES_DB (default = tests)
- POSTGRES_HOST (default = localhost)
- POSTGRES_PORT (default = 5433)
- LOG_LEVEL (default = info)
- FLOWBUILD_URL

## Run the project on docker

To run app on docker, just run the command:

```
docker-compose up
```

Make sure ports 8080 and 5433 are free to use on your localhost.

## Tests

You can run tests by running: 

```
npm run test
```

Note: some tests will fail if you don't have the database running or poiting to 
some flowubuild server as well.

## Swagger

When the app is running along with the database (and poiting to some flowbuild 
server) you can access the following swagger to check out the API routes and test 
them yourself:

http://localhost:8080/swagger