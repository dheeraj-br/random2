[step1-install-express/explain.md](https://github.com/dheeraj-br/random2/blob/step1-install-express/explain.md)

[step2-vsc-extensions/explain.md](https://github.com/dheeraj-br/random2/blob/step2-vsc-extensions/explain.md)

[step3-prettier-eslint/explain.md](https://github.com/dheeraj-br/random2/blob/step3-prettier-eslint/explain.md)

[step4-env-variables/explain.md](https://github.com/dheeraj-br/random2/blob/step4-env-variables/explain.md)

# add debugging

- vsc has built-in debugger, similar to browsers.
- debugger can be attached to a running process or launch a new process in debug mode
- vsc provides various way to use the debugger.

---

- debugger can be configured to auto attach to any node process started with a `--inspect`` flag
- when the process is started by a process manager (eg: nodemon/pm2) debugger auto attaches on every subsequent restart of the app

---

- node process can be launched in debug mode using `start debugging` or `run and debug` option
- with this method there is no option to configure how the app starts, all files are run on node
- file changes don't reflect on the output since debug mode started without a process manager

---

- adding a `launch.json` inside `.vscode` at the folder root allows to have various ways to launch debugger
- options from debug tab can auto-generates a launch.json file stub for node
- notable configs present in this file by default are "request", "runtimeExecutable" and "name"
- "request" has 2 modes: "launch": launches new process in debug mode, "attach": attaches to an already running process
- "runtimeExecutable": specifies executable that can manage the app (eg: process managers)
- "name": a descriptive name to distinguish different debug modes

---

- alternative option to launch a process in debug mode using a process manager
- ensure `"request": "launch"` in the launch.json file is set
- configuring `runtimeExecutable` to run `nodemon` will restart app on file change and reattach debugger
- auto-generating stub in launch.json also achieves the same result

---

- alternative option to launch a process in debug mode
- using the stub in the launch.json file set `"request": "launch"`
- will restart app with node, similar to running debugger without launch.json

---

- to attach a debugger to an already running process, set `"request": "attach"`
- the running process must be started with a `--inspect` flag
- uses `"port": 9229` to establish connection between process and debugger through port: 9229
- can also be configured to attach to only the current process using: `"processId": "${command:PickProcess}"`
- `"restart": true` needs to be set to re attach debugger when app restarts
- on app restart, new debugging state and app state is created, previous debug state/data is lost

---

- debugger can to connect to remote servers through ports, readonly version of code is displayed locally
- there might be security risks when exposing debug ports, more research needed
