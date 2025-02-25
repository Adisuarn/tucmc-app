# TUCC-APP

## About

This project is created for facilitating the workflow of TUCMC members.

## Quick Start

To get it running, follow the steps below:

### 1. Setup dependencies

```bash
# Install dependencies
bun i

# Configure environment variables
# There is an `.env.example` in the root directory you can use for reference
cp .env.example .env

# Push the Drizzle schema to the database
bun db:push
```

### 2a. When it's time to add a new UI component

Run the `ui-add` script to add a new UI component using the interactive `shadcn/ui` CLI:

```bash
bun ui-add
```

When the component(s) has been installed, you should be good to go and start using it in your app.

### 2b. When it's time to add a new package

To add a new package, simply run `bun turbo gen init` in the monorepo root. This will prompt you for a package name as well as if you want to install any dependencies to the new package (of course you can also do this yourself later).

The generator sets up the `package.json`, `tsconfig.json` and a `index.ts`, as well as configures all the necessary configurations for tooling around your package such as formatting, linting and typechecking. When the package is created, you're ready to go build out the package.

### 2c. When it's time to update the dependencies

To update the dependencies, run the following command:

```bash
bun bump-deps
```

This will update all the dependencies in the monorepos to the latest version.
