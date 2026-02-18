export type QuestionType = "boolean" | "input" | "checkbox";

/**
 * Input structure for a single question
 * Used in POST /quizzes
 */
export interface QuestionInput {
  text: string;
  type: QuestionType;
  options?: string[];
}

/**
 * Request body for creating a quiz
 * POST /quizzes
 */
export interface CreateQuiz {
  title: string;
  questions: QuestionInput[];
}

/**
 * Quiz item returned in GET /quizzes
 */
export interface QuizListItem {
  id: number;
  title: string;
  numQuestions: number;
}

/**
 * API error shape
 * Used for consistency in responses
 */
export interface ApiError {
  error: string;
  details?: string;
}
