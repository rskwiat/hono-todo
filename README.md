# Hono to do / task list

A todo list API built with a fully documented type-safe JSON APIs with Hono and Open API.

## Included


## Setup

Create .env file

`cp .env.example .env`

Install dependencies

`npm install`

Create sqlite db / push schema

`npm run migrate:push`

Run

`npm dev`

Lint

`npm lint`

Test

`npm test`


## Endpoints

|||
|-|-|
| Path   | Description   |
|GET /doc   | Open API Specification  |
|GET /reference   | Scalar API Documentation  |
| GET /tasks 	| List all tasks
| POST /tasks 	| Create a task
| GET /tasks/{id} | 	Get one task by id
| PATCH /tasks/{id} 	| Patch one task by id
| DELETE /tasks/{id} | 	Delete one task by id
