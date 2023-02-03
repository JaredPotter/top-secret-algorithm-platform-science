# 🤫 Top Secret Algorithm 🤫 - Platform Science

### Usage

1. Run `yarn` or `yarn install`
2. Run `yarn build` to transpile the typescript file into the output in `build/index.js`.
3. Run `node build/index.js destinations.txt drivers.txt`

### Example Command

`node build/index.js src/input_files/destinations_1.txt src/input_files/drivers_1.txt`

### Features

- Minimal
- TypeScript v4
- Testing with Jest
- Linting with Eslint and Prettier
- Pre-commit hooks with Husky
- VS Code debugger scripts
- Local development with Nodemon

### Scripts

#### `npm run start:dev`

Starts the application in development using `nodemon` and `ts-node` to do hot reloading.

#### `npm run start`

Starts the app in production by first building the project with `npm run build`, and then executing the compiled JavaScript at `build/index.js`.

#### `npm run build`

Builds the app at `build`, cleaning the folder first.

#### `npm run test`

Runs the `jest` tests once.

#### `npm run test:dev`

Run the `jest` tests in watch mode, waiting for file changes.

#### `npm run prettier-format`

Format your code.

#### `npm run prettier-watch`

Format your code in watch mode, waiting for file changes.

### References

- https://github.com/stemmlerjs/simple-typescript-starter
- https://khalilstemmler.com/blogs/typescript/node-starter-project/
