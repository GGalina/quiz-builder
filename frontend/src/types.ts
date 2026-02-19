// frontend/types/frontend/quiz.types.ts

export type QuestionType = "boolean" | "input" | "checkbox";

export interface OptionInput {
  text: string;
  correct: boolean;
}

export interface QuestionFieldProps {
  index: number;
  remove: () => void;
}

export interface QuestionDisplay {
  id: number;
  text: string;
  type: "input" | "boolean" | "checkbox";
  options?: { text: string; correct: boolean }[];
  answer?: string | null;
}
export interface QuizDetailData {
  id: number;
  title: string;
  questions: QuestionDisplay[];
}

export interface QuestionFormInput {
  type: QuestionType; // boolean, input, checkbox
  question: string; // question text
  options: OptionInput[]; // used for checkbox questions
  answer?: string; // used for boolean/input questions
}

export interface QuizFormValues {
  title: string;
  questions: QuestionFormInput[];
}

// For listing quizzes
export interface FrontendQuiz {
  id: number;
  title: string;
  numQuestions: number;
  questions: QuestionFormInput[];
}
