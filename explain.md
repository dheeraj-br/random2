[step1-install-express/explain.md](https://github.com/dheeraj-br/random2/blob/step1-install-express/explain.md)

[step2-vsc-extensions/explain.md](https://github.com/dheeraj-br/random2/blob/step2-vsc-extensions/explain.md)

[step3-prettier-eslint/explain.md](https://github.com/dheeraj-br/random2/blob/step3-prettier-eslint/explain.md)

# environment variables

- to list all environment variables
- in windows cmd run `set`
- in powershell run `gci env:* | sort-object name`
- in git bash run `env`

---

- to set environment variables temporarily for the current running process
- in windows cmd run `set NODE_ENV=development`
- in powershell run `$env:NODE_ENV = "development"`
- in git bash run `export NODE_ENV=development`

---

- to permanently set environment variable in windows
- update the system properties > environment variables > system variables > adding NODE_ENV = development
- prefer permanently setting variables as opposed to creating commands in package.json.
- keeping things platform agnostic

---

- add dotenv package as a dependency
- `npm i dotenv `
- create a folder called `env` that contains `.env.production` and `.env.development` files
