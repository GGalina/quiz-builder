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

1. Get All Quizzes

Endpoint: GET /quizzes

Response Example:
```bash
[
  {
    "id": 1,
    "title": "React Basics",
    "questions": [
      { "id": 1, "text": "What is JSX?", "type": "input", "answer": null },
      { "id": 2, "text": "Is React a library?", "type": "boolean", "answer": "true" }
    ]
  },
]
```

2. Get Quiz by ID

Endpoint: GET /quizzes/:id

Sample Request: GET /quizzes/1

Response Example:
```bash
{
  "id": 1,
  "title": "React Basics",
  "questions": [
    { "id": 1, "text": "What is JSX?", "type": "input", "answer": null },
    { "id": 2, "text": "Is React a library?", "type": "boolean", "answer": "true" },
    {
      "id": 3,
      "text": "Select React hooks",
      "type": "checkbox",
      "options": [
        { "text": "useState", "correct": true },
        { "text": "useEffect", "correct": true },
        { "text": "useFetch", "correct": false }
      ],
      "answer": null
    }
  ]
}
```

3. Create a New Quiz

Endpoint: POST /quizzes

Sample Request Body:
```bash
{
  "title": "New Quiz",
  "questions": [
    { "text": "Your name?", "type": "input", "answer": "" },
    { "text": "Is JS fun?", "type": "boolean", "answer": "true" },
    {
      "text": "Select valid JS types",
      "type": "checkbox",
      "options": ["string", "boolean", "integer"],
      "answer": null
    }
  ]
}
```

Sample Response:
```bash
{
  "id": 3,
  "title": "New Quiz",
  "questions": [
    { "id": 1, "text": "Your name?", "type": "input", "answer": "" },
    { "id": 2, "text": "Is JS fun?", "type": "boolean", "answer": "true" },
    {
      "id": 3,
      "text": "Select valid JS types",
      "type": "checkbox",
      "options": [
        { "text": "string", "correct": false },
        { "text": "boolean", "correct": false },
        { "text": "integer", "correct": false }
      ],
      "answer": null
    }
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
This is the frontend of the Quiz Builder project, built with React, TypeScript, and Tailwind CSS. It allows users to create, view, and manage quizzes.

### Tech Stack

* React (functional components + hooks)
* TypeScript for type safety
* React Router for navigation
* React Hook Form for form handling
* Tailwind CSS for styling
* ESLint + Prettier for code quality and formatting

###  Getting Started

1. Clone the repository
```bash
git clone https://github.com/GGalina/quiz-builder.git
cd frontend
```

2. Install dependencies
```bash
npm install
```

If you encounter peer dependency issues, try:
```bash
npm install --legacy-peer-deps
```

3. Run the frontend
```bash
npm start
```
