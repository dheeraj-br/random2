[step1-install-express/explain.md](https://github.com/dheeraj-br/random2/blob/step1-install-express/explain.md)

[step2-vsc-extensions/explain.md](https://github.com/dheeraj-br/random2/blob/step2-vsc-extensions/explain.md)

[step3-prettier-eslint/explain.md](https://github.com/dheeraj-br/random2/blob/step3-prettier-eslint/explain.md)

[step4-env-variables/explain.md](https://github.com/dheeraj-br/random2/blob/step4-env-variables/explain.md)

[step5-debugging/explain.md](https://github.com/dheeraj-br/random2/blob/step5-debugging/explain.md)

[step6-central-error-handling/explain.md](https://github.com/dheeraj-br/random2/blob/step6-central-error-handling/explain.md)

# add loggers

- add winston package, write error and fatal log levels to file.
- add morgan, this will print to console all request made to the app
- add pino and pino-pretty to log errors messages in colorful easily readable form, with less overhead
- TODO: create factory patter to choose loggers
- TODO: configure winston to write to console, and log http request from morgan
- TODO: configure pino and winston to write to database (mongodb, elasticsearch, mysql, pg, redis)
- TODO: configure pino to write to file, and log http request and response
