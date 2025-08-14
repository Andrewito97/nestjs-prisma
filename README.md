<p style="display:flex; justify-content: space-around">
  <a href="http://nestjs.com/" target="blank">
    <img 
      src="https://nestjs.com/img/logo-small.svg" 
      width="200" 
      alt="Nest Logo" 
    />
  </a>
  <a href="https://www.prisma.io/" target="blank">
    <img 
      src="https://www.prisma.io/docs/img/logo.svg" 
      width="400" 
      alt="Prisma Logo" 
    />
  </a>
</p>

## Description

PoC repository for [Nest](https://github.com/nestjs/nest) & [Prisma](https://www.prisma.io/).

## Requirements

- Node: **19.4.0**^
- npm: **9.2.0**^
- PostgreSQL

## Installation

```bash
$ npm install
```

## Environment variables

```
DATABASE_URL="postgresql://<postgres_username>:<postgres_pass>@localhost:5432/prisma_db?schema=public"
```

## Prepare database

First you should generate prisma client based on model schema

```bash
$ npm run prisma:generate-client
```

After any model changes run:

```bash
$ npm run prisma:generate-migration migrationName
```

To run existing migrations:

```bash
$ npm run prisma:run-migrations
```

## Running the app

```bash
$ npm run start:dev
```

## Stay in touch

- Author - [Andrew Holenkov](https://github.com/Andrewito97)
