RShell
======

A http remote shell controller

#### Installation
```bash
sudo npm install -g rshell
```

#### Start remote shell server
```bash
rshell --server --port 3000
```

#### Start listening for remote commands (client)
```bash
rshell --domain http://localhost:3000 --clientId mypcX
```
