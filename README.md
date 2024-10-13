# Zakamo

React project using [Material UI](https://mui.com/material-ui/all-components/).

## Development

Install dependencies.

```bash
$ bun install

bun install v1.1.26 (0a37423b)
Checked 312 installs across 349 packages (no changes) [29.00ms]
```

Start the local development server.

```bash
$ bun run start

  VITE v5.4.8  ready in 174 ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: http://192.168.50.102:3000/
  ➜  press h + enter to show help
```

## Deploy to Prod

Build to production files to the `docs` folder then git commit and push to Github.

```bash
$ bun run build

vite v5.4.8 building for production...
✓ 474 modules transformed.
build/index.html 0.45 kB │ gzip:   0.30 kB
...
✓ built in 892ms
```
