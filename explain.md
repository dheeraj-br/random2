[step1-install-express/explain.md](https://github.com/dheeraj-br/random2/blob/step1-install-express/explain.md)

[step2-vsc-extensions/explain.md](https://github.com/dheeraj-br/random2/blob/step2-vsc-extensions/explain.md)

# add prettier and eslint

- linting vs formatter: linter checks for code standard, formatter corrects look and feel
- use prettier for formatting and eslint for linting

---

- install prettier extension for vsc, this will update files according to built-in prettier settings
- prettier extension updates files on save according to the prettier formatter rules
- few prettier configs can be defined in workspace's settings.json which would be specific to vsc only
- for compatibility with all editors, prettier configs should to be added to `.prettierrc.json`
- run `npm i prettier --save-exact --save-dev`
- adding npm package provides formatting rules and ensures consistency, new releases change rules
- add `.prettierignore`, directories and files mentioned here are not formatted
- files and folders starting with . and node_modules are ignored by default
- add custom rules to `.prettierrc.json`
- eg: run `npx prettier --write src/` to manually fix formatting in "src" folder
- set vsc indentation "spaces" to 2 (or as per prettier config), for files ignored by linters

---

- install eslint extension for vsc, this will provide live hints for code correction in editor
- run `npm i eslint --save-exact --save-dev`
- npm package provides linting rules and ensures consistency, new releases change rules
- `npm init @eslint/config` or `npx eslint --init` to create `.eslintrc.json` stub from cli
- add eslint `ignorePatterns` option to skip checking of specific files
- eg: `"ignorePatterns": ["build/"]`
- files and folders starting with . and node_modules are ignored by default
- add custom eslint plugins, configs, override rules
- use any of the popular rules such as airbnb, standard, google etc.
- eg: run `npm i eslint-plugin-promise eslint-config-airbnb-base --save-dev`
- add plugin names under `plugin` key, config names under `extends` key
- run `npx eslint .` to check for linting errors in "all" files
- run `npx eslint . --fix` to update "all" files according to "linter's formatting" rules

---

- prettier formatter must "turn off" eslint's formatting rules
- add `eslint-config-prettier` to turn off conflicting configs
- run `npm install eslint-config-prettier --save-dev`
- add 'prettier' config under `extends` key as the last option, so that it "turns off" other conflicting configs
- now prettier takes over formatting, eslint only handles linting.
- this turns off formatting hits in the editor aswell, to fix this:
- add `eslint-plugin-prettier` to turn off conflicting plugins
- add 'prettier' plugin under `plugins` key as the last option, so that it "turns off" other conflicting plugins
- add `"prettier/prettier": "error"` under `rules`, this will configure eslint to display errors from prettier.
- 'rules' in eslint overrides 'extensions', we would need to remove conflicts with prettier.
- run `npx eslint-config-prettier .\anyFile.ext` to check for eslint rules that conflict with prettier.
- remove conflicting rules from .eslintrc.json

---

- add commands to package.josn to manually lint and format code
- `"lint:checkAll": "eslint ."`
- `"format:fixAll": "eslint . --fix"`

---

- add git hook pre-commit (using husky) to enforce linting rules on staged files (using lint-staged)
- `npm i lint-staged husky --save-dev`
- add `.lintstagedrc.json` file to hold commands that will be run against specific files and folders
- `{"**/*.{js,ts,html,css}": "eslint --fix"}`
- use glob pattern to run command against all nested subfolders having any file name with ending with js, ts, html, css extensions
- call eslint --fix to fix both formatting and linting errors with once command

---

- add `prepare` script to package.json that calls `husky install`
- `npm pkg set scripts.prepare="husky install"` can be used to create it with command line
- prepare script is built into package.json and runs before and after `npm i` and before publishing package.
- `husky install` creates a new .husky folder with shell command folder, this should not be modified.
- add pre-commit hook file by running `npx husky add .husky/pre-commit "npx lint-staged"`
- this file will call the commands listed in `lint-staged` against "staged" files before a git commit is made
- pre commit hooks should be used to run linter, formatters and tests
