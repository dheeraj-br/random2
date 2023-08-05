[step1-install-express/explain.md](https://github.com/dheeraj-br/random2/blob/step1-install-express/explain.md)

[step2-vsc-extensions/explain.md](https://github.com/dheeraj-br/random2/blob/step2-vsc-extensions/explain.md)

[step3-prettier-eslint/explain.md](https://github.com/dheeraj-br/random2/blob/step3-prettier-eslint/explain.md)

[step4-env-variables/explain.md](https://github.com/dheeraj-br/random2/blob/step4-env-variables/explain.md)

[step5-debugging/explain.md](https://github.com/dheeraj-br/random2/blob/step5-debugging/explain.md)

# add central error handling

- install http-status for convenient list of http codes and descriptive names
- adding a middleware with 4 parameter (error, req, res, next) makes it an error handler.
- calling next(anyData) from a middleware will transfer execution control to the error handler, skipping all other middlewares
- all exception thrown from a sync function is caught by error handler
- promise rejections are not caught by error handlers
- unhandled exceptions inside routes are caught by error handlers, express catches it if not none are defined
- unhandled exceptions outside of routes can only be caught by listening to it on node "process"
- all uncaught promise rejection can only be caught by listening to it on node "process"

---

- `unhandledRejection` are thrown when a promise is reject and there is no catch block to handle it
- `uncaughtException` are thrown when code breaks and there is no try block, cannot happen inside routes since there are error handling middleware
- inside an async method, exceptions become rejections. if not caught they become `unhandledRejection`

---

- `unhandledRejection`
- uncaught promise rejection from sync methods skip all error handling middlewares
- uncaught promise rejection from async methods skip all error handling middlewares
- uncaught promise rejection from async methods wrapped inside sync hof with try block skips all error handling middlewares

---

- `uncaughtException`
- unhandled exception thrown from sync methods get caught by error handling middlewares
- unhandled exception thrown from sync methods wrapped inside sync hof with try block get caught by error handling middlewares
- unhandled exception thrown from async methods wrapped inside sync hof with try block get caught by error handling middlewares
- unhandled exception thrown from any async methods without try block become `unhandledRejection` and skips all error handling middleware

---

- errors can be categorized as "operational" and "programming"
- "operational" error are invalid way of using the application.
- "programming" errors are bugs present in the code
- sensitive information about app and its users must not be displayed to the client
- sensitive information about app and its users that are logged must be secured
- "operational" errors might not need logging, logging this can be useful for metrics
- "programming" errors must be logged for debugging and is the main purpose of having error handling

---

- operational errors such as 404 errors do not need logging or verbose error messages
- these can be handled by adding a 'catch all' route after all other routes are added
- controller of this route should not stop execution, should return a response to client directly
