###### Rebase source: the final code of the GraphQL API built in the [Nexus tutorial](https://www.nexusjs.org/#/tutorial/introduction) 🚀.

## Usage

#### 1. Install the dependencies

```sh
yarn
```

#### 2. Setup the PostgreSQL database (using Docker)

```sh
docker run --detach --publish 5432:5432 -e POSTGRES_PASSWORD=postgres --name postgres postgres:10.12
```

#### 3. Start the server

To interact with the API in a GraphQL Playground, all you need to do is execute the `dev` script defined in the package.json:

```sh
yarn dev
```

## Test
One of the areas the framework makes significant improvements is the testing framework.

```sh
yarn test
```

