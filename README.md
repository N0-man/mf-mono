# Module Federation Monorepo boilerplate to demonstrate MF

## Packages

- [`@mf/app`](./packages/app) — App shell
- [`@mf/header`](./packages/header) — Header module
- [`@mf/data`](./packages/data) — Data module

## Tools/Configs

- [`@mf/config`](./tools/config) — Base config
- [`@mf/scripts`](./tools/scripts) — Common scripts
- [`@mf/browserslist-config-mf`](./tools/browserslist-config-mf) –
  `browserslist` configuration

## Setup

- **Start**

  - Run `yarn start`, pick a package to start

  - Start a package directly using `yarn start PACKAGE_NAME`

    eg. `yarn start @mf/app`

- **Build** — `yarn pkg:run PACKAGE_NAME build`

  eg. `yarn pkg:run @mf/header build`

## Configuration

- `mf.config.js` in package root folder can be used to override default
  configuration. e.g. port
