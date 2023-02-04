# 🤫 Top Secret Algorithm 🤫 - Platform Science

### Usage

1. Run `npm install`
2. Run `npm run build` to transpile the typescript file into the output in `build/index.js`.
3. Run `node build/index.js destinations.txt drivers.txt` with your specific file paths. Alternatively, you can add your files to the `src/input_files` directory, and edit the `.vscode/launch.json` args to debug your specific files.

### Assumptions

- Basic file path validation
- Primary function is wrapped in a self-executing function to allow for returning from the initial file validation checks.
- Regular English letters (a-z); no letters with accents
- We only count 'y' as a vowel if there is 1.) no other vowel in the world or 2.) 'y' is at the end of a word. However, we do not count 'y' as a vowel in its other special cases - where 'y' is in the middle or end of a syllable due to complexity of parsing individual syllables.

### Coding Style

I prefer explicitly named variable & function names that are self-documenting. Additionally I like to assign the results of statements into variables before being used or returned as I find it helpful when debugging code. Lastly, I like to write code my sequentially rather than deeply nested ifs/loops as I find it easier to read and follow.

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
