# Quiz Builder Backend

## Backend
This is the backend for the Quiz Builder web application. It provides a REST API to manage quizzes and their questions. Built with Node.js, Express, TypeScript, and Prisma (SQLite).

### Tech Stack

* Node.js
* TypeScript
* Express.js
* SQLite (via Prisma ORM)
* Prisma Client for database access
* dotenv for environment configuration
* CORS for cross-origin requests

### Environment Variables

Create a .env file in the backend root:

```bash
DATABASE_URL="file:./dev.db"
PORT=4000
```

DATABASE_URL – Path to SQLite database
PORT – Server port (default 4000)

### Installation

Install dependencies:
```bash
npm install
```

Generate Prisma client:
```bash
npx prisma generate
```

Run migrations to create database tables:
```bash
npx prisma migrate dev --name init
```

Start the server in development mode:
```bash
npm run dev
```
Server runs on: http://localhost:4000

### API Endpoints
1. Get all quizzes

Endpoint: GET /quizzes

Response:

```bash
[
  {
    "id": 1,
    "title": "Sample Quiz",
    "numQuestions": 3
  }
]
```

2. Get quiz by ID

Endpoint: GET /quizzes/:id

Response:

```bash
{
  "id": 1,
  "title": "Sample Quiz",
  "questions": [
    { "id": 1, "text": "Is the sky blue?", "type": "boolean", "options": null }
  ]
}
```
3. Create a quiz

Endpoint: POST /quizzes

Request Body:

```bash
{
  "title": "Sample Quiz",
  "questions": [
    { "text": "Is the sky blue?", "type": "boolean" },
    { "text": "Your name?", "type": "input" },
    { "text": "Select fruits", "type": "checkbox", "options": ["Apple","Banana"] }
  ]
}
```

Response:

```bash
{
  "id": 1,
  "title": "Sample Quiz",
  "questions": [
    { "id": 1, "text": "Is the sky blue?", "type": "boolean", "options": null }
  ]
}
```
4. Delete a quiz

Endpoint: DELETE /quizzes/:id

Response:

```bash
{ "message": "Quiz deleted" }
```
 * Notes

- This backend does not track correct answers. It stores quiz questions and options only.
- All request bodies are validated for structure and type safety.


### Seed Data Example

You can use the provided prisma/seed.ts file to insert sample quizzes into the database. This is useful for testing and development.

To run the file
```bash
npm run seed
```

## Frontend
