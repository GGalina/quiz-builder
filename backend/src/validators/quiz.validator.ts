import { CreateQuiz, QuestionInput } from "../types/quiz.types";

// Validate POST /quizzes request body
export const validateCreateQuiz = (body: unknown): CreateQuiz => {
    if (!body || typeof body !== "object") {
        throw new Error("Request body must be an object");
    }

    const { title, questions } = body as Partial<CreateQuiz>;

    if (typeof title !== "string" || title.trim().length === 0) {
        throw new Error("Title is required and must be a non-empty string");
    }

    if (!Array.isArray(questions) || questions.length === 0) {
        throw new Error("Questions must be a non-empty array");
    }

    questions.forEach(validateQuestion);

    return {
        title: title.trim(),
        questions,
    };
};

// Validate a single question
const validateQuestion = (question: unknown): void => {
  if (!question || typeof question !== "object") throw new Error("Each question must be an object");
  
  const { text, type, options, answer } = question as Partial<QuestionInput>;

  if (!text || typeof text !== "string") throw new Error("Question text must be non-empty");
  if (!["boolean", "input", "checkbox"].includes(type!)) throw new Error(`Invalid type: ${type}`);

  if (type === "checkbox") {
    if (!Array.isArray(options) || options.length === 0) throw new Error("Checkbox must have options");
  } else {
    if (typeof answer !== "string" || answer.trim() === "") {
      throw new Error(`${type} question "${text}" must have an answer`);
    }
  }
};

// Validate quiz ID from params
export const validateQuizId = (id: unknown): number => {
    const quizId = Number(id);

    if (!Number.isInteger(quizId) || quizId <= 0) {
        throw new Error("Quiz ID must be a positive integer");
    }

    return quizId;
};
